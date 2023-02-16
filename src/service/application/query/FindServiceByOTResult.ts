import { IQueryResult } from '@nestjs/cqrs';
import { VehicleOwner } from '../../domain/Service';
import { Vehicle } from '../../domain/Vehicle';

export class FindServiceByOTResult implements IQueryResult {
  readonly id: number;
  readonly ot: string;
  readonly vehicle: Vehicle;
  readonly vehicleOwner: VehicleOwner;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}
