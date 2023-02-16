import { ICommand } from '@nestjs/cqrs';

export class UpdateDiagnosticCommand implements ICommand {
  constructor(readonly serviceId: number, readonly diagnostic: string) {}
}
