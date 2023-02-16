import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import {
  FinishService,
  IntegrationEventPublisher,
  INTEGRATION_EVENT_PUBLISHER,
  Topic,
} from 'libs/MessageModule';
import { Transactional } from 'libs/Transactional';

import { FinishServiceEvent } from '../../domain/event/FinishServiceEvent';

@EventsHandler(FinishServiceEvent)
export class FinishServiceHandler implements IEventHandler<FinishServiceEvent> {
  @Inject(INTEGRATION_EVENT_PUBLISHER)
  private readonly integrationEventPublisher: IntegrationEventPublisher;

  @Transactional()
  async handle(event: FinishServiceEvent): Promise<void> {
    await this.integrationEventPublisher.publish(
      Topic.SERVICE_FINISH,
      new FinishService(event.serviceId),
    );
  }
}
