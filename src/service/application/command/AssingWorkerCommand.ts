import { ICommand } from '@nestjs/cqrs';

export class AssingWorkerCommand implements ICommand {
  constructor(readonly serviceId: number, readonly userId: number) {}
}
