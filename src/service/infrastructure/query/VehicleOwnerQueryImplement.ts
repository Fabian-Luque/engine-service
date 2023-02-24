import { Injectable } from '@nestjs/common';

import { readConnection } from 'libs/DatabaseModule';
import { VehicleOwnerQuery } from '../../application/query/VehicleOwnerQuery';
import { VehicleOwnerResult } from '../../application/query/vehicleOwner/VehicleOwnerResult';
import { VehicleOwnerEntity } from '../entities/VehicleOwnerEntity';

@Injectable()
export class VehicleOwnerQueryImplement implements VehicleOwnerQuery {
  async findByIdentifier(
    identifier: string,
  ): Promise<VehicleOwnerResult | null> {
    return readConnection
      .getRepository(VehicleOwnerEntity)
      .findOne({
        where: { identifier },
      })
      .then((entity) => (entity ? entity : null));
  }
}
