import { IQueryResult } from '@nestjs/cqrs';

export class VehicleResult implements IQueryResult {
  readonly id: number;
  readonly patent: string;
  readonly model: string;
  readonly brand: string;
  readonly year: number;
  readonly vin: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}
