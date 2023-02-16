import { IQueryResult } from '@nestjs/cqrs';
import { Evidence, RequestService, VehicleOwner } from '../../domain/Service';
import { Vehicle, VehicleImplement } from '../../domain/Vehicle';
import { VehicleEntity } from '../../infrastructure/entities/VehicleEntity';

export class ServiceResult implements IQueryResult {
  readonly id: number;
  readonly OT: string;
  readonly state: string;
  readonly commentOwner: string;
  readonly vehicle: VehicleEntity;
  readonly vehicleOwner: VehicleOwner;
  readonly requests: RequestService[] | any;
  readonly comments: Comment[] | any;
  readonly diagnostic: string;
  readonly evidences: Evidence[] | any;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}
