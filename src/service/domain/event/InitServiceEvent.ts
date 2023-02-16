import { IEvent } from '@nestjs/cqrs';

export class InitServiceEvent implements IEvent {
  constructor(readonly serviceId: number) {}
}
