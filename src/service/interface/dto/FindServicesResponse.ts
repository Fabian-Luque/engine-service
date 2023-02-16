import { ApiProperty } from '@nestjs/swagger';

import { ServiceResult } from '../../application/query/ServiceResult';
import { Evidence, VehicleOwner } from '../../domain/Service';
import { Vehicle } from '../../domain/Vehicle';
import { VehicleEntity } from '../../infrastructure/entities/VehicleEntity';

export class FindServicesResponseDTO extends ServiceResult {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: '12312kas' })
  readonly OT: string;

  @ApiProperty({ example: 'test' })
  readonly state: string;

  @ApiProperty({ example: 'test' })
  readonly commentOwner: string;

  @ApiProperty()
  readonly vehicle: VehicleEntity;

  @ApiProperty()
  readonly vehicleOwner: VehicleOwner;

  @ApiProperty()
  readonly requests: VehicleOwner;

  @ApiProperty()
  readonly comments: Comment[];

  @ApiProperty()
  readonly diagnostic: string;

  @ApiProperty()
  readonly evidences: Evidence[];

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty({ nullable: true, example: null })
  readonly deletedAt: Date | null;
}
