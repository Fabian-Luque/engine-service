import { IQueryResult } from '@nestjs/cqrs';
import { Vehicle } from '../../../domain/vehicle/Vehicle';
import { VehicleOwner } from '../../../domain/vehicleOwner/VehicleOwner';

export class FindServiceByOTResult implements IQueryResult {
  readonly id: number;
  readonly ot: string;
  readonly vehicle: Vehicle;
  readonly vehicleOwner: VehicleOwner;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}
