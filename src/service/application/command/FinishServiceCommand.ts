import { ICommand } from '@nestjs/cqrs';

export class FinishServiceCommand implements ICommand {
  constructor(readonly serviceId: number, readonly description: string) {}
}
