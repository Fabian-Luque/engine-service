import { IQuery } from '@nestjs/cqrs';

export class FindVehicleByPatentQuery implements IQuery {
  constructor(readonly patent: string) {}
}
