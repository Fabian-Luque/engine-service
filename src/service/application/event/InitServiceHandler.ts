import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import {
  InitService,
  IntegrationEventPublisher,
  INTEGRATION_EVENT_PUBLISHER,
  Topic,
} from 'libs/MessageModule';
import { Transactional } from 'libs/Transactional';

import { InitServiceEvent } from '../../domain/event/InitServiceEvent';

@EventsHandler(InitServiceEvent)
export class InitServiceHandler implements IEventHandler<InitServiceEvent> {
  @Inject(INTEGRATION_EVENT_PUBLISHER)
  private readonly integrationEventPublisher: IntegrationEventPublisher;

  @Transactional()
  async handle(event: InitServiceEvent): Promise<void> {
    await this.integrationEventPublisher.publish(
      Topic.SERVICE_INIT,
      new InitService(event.serviceId),
    );
  }
}
