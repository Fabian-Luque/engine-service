import { DiscoveryService, DiscoveryModule } from '@nestjs-plus/discovery';
import {
  Global,
  Inject,
  Logger,
  Module,
  OnModuleDestroy,
  SetMetadata,
} from '@nestjs/common';
import { Kafka } from "kafkajs";
import { IEvent } from '@nestjs/cqrs';
import { Interval } from '@nestjs/schedule';
import { ModulesContainer } from '@nestjs/core';

import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';

import {
  CreateTopicCommand,
  SNSClient,
  PublishCommand,
} from '@aws-sdk/client-sns';



import { Config } from 'src/Config';
import { RequestStorage } from 'libs/RequestStorage';

type Message = Readonly<{ name: string; body: IEvent; requestId: string }>;
type MessageHandlerMetadata = Readonly<{ name: string }>;

const SQS_CONSUMER_METHOD = Symbol.for('SQS_CONSUMER_METHOD');
export const MessageHandler = (name: string) =>
  SetMetadata<symbol, MessageHandlerMetadata>(SQS_CONSUMER_METHOD, { name });

class SQSConsumerService implements OnModuleDestroy {
  private readonly logger = new Logger(SQSConsumerService.name);
  @Inject() private readonly discover: DiscoveryService;
  @Inject() private readonly modulesContainer: ModulesContainer;
  private readonly sqsClient = new SQSClient({
    region: Config.AWS_REGION,
    endpoint: Config.AWS_ENDPOINT,
    credentials: {
      accessKeyId: Config.AWS_ACCESS_KEY_ID,
      secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
    },
  });

  @Interval(5000)
  async handleMessage(): Promise<void> {
    RequestStorage.reset();
    const response = (
      await this.sqsClient.send(
        new ReceiveMessageCommand({
          QueueUrl: Config.AWS_SQS_QUEUE_URL,
          AttributeNames: ['All'],
          MessageAttributeNames: ['All'],
          MaxNumberOfMessages: 1,
        }),
      )
    ).Messages;
    if (!response || !response[0] || !response[0].Body) return;

    const message = (
      (JSON.parse(response[0].Body) as { Message?: string }).Message
        ? JSON.parse(
            (JSON.parse(response[0].Body) as { Message: string }).Message,
          )
        : JSON.parse(response[0].Body)
    ) as Message;
    RequestStorage.setRequestId(message.requestId);

    const handler = (
      await this.discover.controllerMethodsWithMetaAtKey<MessageHandlerMetadata>(
        SQS_CONSUMER_METHOD,
      )
    ).find((handler) => handler.meta.name === message.name);
    if (!handler)
      throw new Error(
        `Message handler is not found. Message: ${JSON.stringify(message)}`,
      );

    const controller = Array.from(this.modulesContainer.values())
      .filter((module) => 0 < module.controllers.size)
      .flatMap((module) => Array.from(module.controllers.values()))
      .find(
        (wrapper) => wrapper.name == handler.discoveredMethod.parentClass.name,
      );
    if (!controller)
      throw new Error(
        `Message handling controller is not found. Message: ${JSON.stringify(
          message,
        )}`,
      );

    try {
      await handler.discoveredMethod.handler.bind(controller.instance)(
        message.body,
      );
      await this.sqsClient.send(
        new DeleteMessageCommand({
          QueueUrl: Config.AWS_SQS_QUEUE_URL,
          ReceiptHandle: response[0].ReceiptHandle,
        }),
      );
    } catch (error) {
      return this.logger.error(
        `Message handling error. Message: ${JSON.stringify(
          message,
        )}. Error: ${error}`,
      );
    }
    this.logger.log(
      `Message handling completed. Message: ${JSON.stringify(message)}`,
    );
  }

  onModuleDestroy(): void {
    this.sqsClient.destroy();
  }
}

export enum Topic {
  SERVICE_INIT = 'ServiceInit',
  SERVICE_FINISH = 'ServiceFinish',
  SERVICE_REQUEST = 'ServiceRquest',
  STATE_UPDATE = 'StateUpdate',
}

export class InitService {
  constructor(readonly serviceId: number) {}
}

export class FinishService {
  constructor(readonly serviceId: number) {}
}

export class RequestService {
  constructor(readonly serviceId: number) {}
}

export class StateUpdate {
  constructor(readonly serviceId: number) {}
}


class SNSMessagePublisher {
  private readonly snsClient = new SNSClient({
    region: Config.AWS_REGION,
    endpoint: Config.AWS_ENDPOINT,
    credentials: {
      accessKeyId: Config.AWS_ACCESS_KEY_ID,
      secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
    },
  });
  private readonly logger = new Logger(SNSMessagePublisher.name);

  async publish(Name: Topic, Message: Message): Promise<void> {
    const message = {
      TopicArn: (await this.snsClient.send(new CreateTopicCommand({ Name })))
        .TopicArn,
      Message: JSON.stringify(Message),
    };
    await this.snsClient.send(new PublishCommand(message));
    this.logger.log(`Message published. Message: ${JSON.stringify(message)}`);
  }
}

class KAFKAMessagePublisher {
  private readonly kafka = new Kafka({brokers: ["kafka:9092"], clientId: "service-app"});
  private readonly kfkClient = this.kafka.producer({
    maxInFlightRequests: 1,
    idempotent: true,
    transactionalId: "uniqueProducerId",
  });

  private readonly logger = new Logger('KAFKA Publish');

  async publish(Name: Topic, Message: Message): Promise<void> {
    const message = {
      topic: Name,
      messages: [{key: "test", value: JSON.stringify(Message)}],
    };
    await this.kfkClient.send(message);
    this.logger.log(`Message published. Message: ${JSON.stringify(message)}`);
  }
}

export interface IntegrationEventPublisher {
  publish: (name: Topic, body: IEvent) => Promise<void>;
}

class IntegrationEventPublisherImplement implements IntegrationEventPublisher {
  // @Inject() private readonly snsMessagePublisher: SNSMessagePublisher;
  @Inject() private readonly kafkaMessagePublisher: KAFKAMessagePublisher;

  async publish(name: Topic, body: IEvent): Promise<void> {
    await this.kafkaMessagePublisher.publish(name, {
      name,
      body,
      requestId: RequestStorage.getStorage().requestId,
    })
    // await this.snsMessagePublisher.publish(name, {
    //   name,
    //   body,
    //   requestId: RequestStorage.getStorage().requestId,
    // });
  }
}

export const INTEGRATION_EVENT_PUBLISHER = 'IntegrationEventPublisher';

class SQSMessagePublisher {
  private readonly sqsClient = new SQSClient({
    region: Config.AWS_REGION,
    endpoint: Config.AWS_ENDPOINT,
  });
  private readonly logger = new Logger(SQSMessagePublisher.name);

  async publish(message: Message): Promise<void> {
    await this.sqsClient.send(
      new SendMessageCommand({
        QueueUrl: Config.AWS_SQS_QUEUE_URL,
        MessageBody: JSON.stringify(message),
        DelaySeconds: Math.round(Math.random() * 10),
      }),
    );
    this.logger.log(`Message published. Message: ${JSON.stringify(message)}`);
  }
}

export interface TaskPublisher {
  publish: (name: string, task: IEvent) => Promise<void>;
}

class TaskPublisherImplement implements TaskPublisher {
  @Inject() private readonly sqsMessagePublisher: SQSMessagePublisher;

  async publish(name: string, body: IEvent): Promise<void> {
    await this.sqsMessagePublisher.publish({
      name,
      body,
      requestId: RequestStorage.getStorage().requestId,
    });
  }
}

export const TASK_PUBLISHER = 'TaskPublisher';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [
    SQSConsumerService,
    SQSMessagePublisher,
    SNSMessagePublisher,
    {
      provide: INTEGRATION_EVENT_PUBLISHER,           //FOR MESSAGE
      useClass: IntegrationEventPublisherImplement,
    },
    // {
    //   provide: TASK_PUBLISHER,
    //   useClass: TaskPublisherImplement,  // FOR CRON
    // },
  ],
  exports: [INTEGRATION_EVENT_PUBLISHER, TASK_PUBLISHER],
})
export class MessageModule {}
