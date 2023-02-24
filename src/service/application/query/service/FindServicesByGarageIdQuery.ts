import { IQuery } from '@nestjs/cqrs';

export class FindServicesByGarageIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
