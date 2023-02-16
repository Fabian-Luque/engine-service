import { IEvent } from '@nestjs/cqrs';

export class StateUpdateEvent implements IEvent {
  constructor(
    readonly serviceId: number,
    readonly oldState: string,
    readonly state: string,
  ) {}
}
