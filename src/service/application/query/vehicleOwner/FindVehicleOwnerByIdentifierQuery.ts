import { IQuery } from '@nestjs/cqrs';

export class FindVehicleOwnerByIdentifierQuery implements IQuery {
  constructor(readonly identifier: string) {}
}
