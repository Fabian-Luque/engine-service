import { IEvent } from '@nestjs/cqrs';

export class RequestServiceEvent implements IEvent {
  constructor(readonly serviceId: number) {}
}
