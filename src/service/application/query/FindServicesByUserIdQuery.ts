import { IQuery } from '@nestjs/cqrs';

export class FindServicesByUserIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
