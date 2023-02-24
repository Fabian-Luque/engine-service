import { IQuery } from '@nestjs/cqrs';

export class FindServiceByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
