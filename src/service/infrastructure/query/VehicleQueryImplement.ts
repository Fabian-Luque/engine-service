import { Injectable } from '@nestjs/common';

import { readConnection } from 'libs/DatabaseModule';
import { VehicleEntity } from '../entities/VehicleEntity';
import { VehicleQuery } from '../../application/query/VehicleQuery';
import { VehicleResult } from '../../application/query/vehicle/VehicleResult';

@Injectable()
export class VehicleQueryImplement implements VehicleQuery {
  async findByPatent(patent: string): Promise<VehicleResult | null> {
    return readConnection
      .getRepository(VehicleEntity)
      .findOne({
        where: { patent },
      })
      .then((entity) => (entity ? entity : null));
  }
}
