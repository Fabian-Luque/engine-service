import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import {
  IntegrationEventPublisher,
  INTEGRATION_EVENT_PUBLISHER,
  StateUpdate,
  Topic,
} from 'libs/MessageModule';
import { Transactional } from 'libs/Transactional';

import { StateUpdateEvent } from '../../domain/event/StateUpdateEvent';

@EventsHandler(StateUpdateEvent)
export class StateUpdateHandler implements IEventHandler<StateUpdateEvent> {
  @Inject(INTEGRATION_EVENT_PUBLISHER)
  private readonly integrationEventPublisher: IntegrationEventPublisher;

  @Transactional()
  async handle(event: StateUpdateEvent): Promise<void> {
    await this.integrationEventPublisher.publish(
      Topic.SERVICE_INIT,
      new StateUpdate(event.serviceId),
    );
  }
}
