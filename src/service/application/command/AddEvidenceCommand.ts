import { ICommand } from '@nestjs/cqrs';

export class AddEvidenceCommand implements ICommand {
  constructor(
    readonly serviceId: number,
    readonly detail: string,
    readonly imgUrl: string,
  ) {}
}
