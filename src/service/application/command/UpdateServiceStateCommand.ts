import { ICommand } from '@nestjs/cqrs';

export class UpdateServiceStateCommand implements ICommand {
  constructor(readonly serviceId: number, readonly state: string) {}
}
