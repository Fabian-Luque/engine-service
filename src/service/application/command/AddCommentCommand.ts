import { ICommand } from '@nestjs/cqrs';

export class AddCommentCommand implements ICommand {
  constructor(
    readonly serviceId: number,
    readonly detail: string,
    readonly imgUrl: string,
  ) {}
}