import { IQueryResult } from '@nestjs/cqrs';
import { Evidence, RequestService } from '../../../domain/service/Service';
import { VehicleEntity } from '../../../infrastructure/entities/VehicleEntity';
import { VehicleOwnerEntity } from '../../../infrastructure/entities/VehicleOwnerEntity';

export class ServiceResult implements IQueryResult {
  readonly id: number;
  readonly OT: string;
  readonly state: string;
  readonly commentOwner: string;
  readonly vehicle: VehicleEntity;
  readonly vehicleOwner: VehicleOwnerEntity;
  readonly requests: RequestService[] | any;
  readonly comments: Comment[] | any;
  readonly diagnostic: string;
  readonly evidences: Evidence[] | any;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}
