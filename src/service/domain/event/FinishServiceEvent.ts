import { IEvent } from "@nestjs/cqrs";

export class FinishServiceEvent implements IEvent {
  constructor(readonly serviceId: number) {}
}