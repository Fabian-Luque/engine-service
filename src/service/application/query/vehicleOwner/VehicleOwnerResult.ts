import { IQueryResult } from '@nestjs/cqrs';

export class VehicleOwnerResult implements IQueryResult {
  readonly id: number;
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly identifier: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}
