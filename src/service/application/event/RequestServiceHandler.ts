import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import {
  IntegrationEventPublisher,
  INTEGRATION_EVENT_PUBLISHER,
  RequestService,
  Topic,
} from 'libs/MessageModule';
import { Transactional } from 'libs/Transactional';

import { RequestServiceEvent } from '../../domain/event/RequestServiceEvent';

@EventsHandler(RequestServiceEvent)
export class RequestServiceHandler implements IEventHandler<RequestServiceEvent> {
  @Inject(INTEGRATION_EVENT_PUBLISHER)
  private readonly integrationEventPublisher: IntegrationEventPublisher;

  @Transactional()
  async handle(event: RequestServiceEvent): Promise<void> {
    await this.integrationEventPublisher.publish(
      Topic.SERVICE_INIT,
      new RequestService(event.serviceId),
    );
  }
}
