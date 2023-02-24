import { IQueryResult } from '@nestjs/cqrs';

import { Vehicle } from '../../../domain/vehicle/Vehicle';
import { VehicleOwner } from '../../../domain/vehicleOwner/VehicleOwner';

export class FindServicesByGarageIdResult implements IQueryResult {
  readonly id: number;
  readonly ot: string;
  readonly vehicle: Vehicle | any;
  readonly vehicleOwner: VehicleOwner | any;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}
