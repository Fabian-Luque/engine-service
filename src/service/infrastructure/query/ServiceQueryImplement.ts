import { Injectable } from '@nestjs/common';

import { readConnection } from 'libs/DatabaseModule';
import { ServiceResult } from '../../application/query/service/ServiceResult';
import { FindServiceByOTResult } from '../../application/query/service/FindServiceByOTResult';
import { FindServicesByGarageIdResult } from '../../application/query/service/FindServicesByGarageIdResult';
import { ServiceQuery } from '../../application/query/ServiceQuery';
import { ServiceEntity } from '../entities/ServiceEntity';

@Injectable()
export class ServiceQueryImplement implements ServiceQuery {
  async findById(id: number): Promise<ServiceResult | null> {
    return readConnection
      .getRepository(ServiceEntity)
      .findOne({
        where: { id: id },
        relations: ['vehicle', 'vehicleOwner', 'comments', 'requests'],
      })
      .then((entity) => (entity ? entity : null));
  }

  async findByGarageId(
    garageId: number,
  ): Promise<FindServicesByGarageIdResult[] | null> {
    return readConnection
      .getRepository(ServiceEntity)
      .find({
        where: { garageId: garageId },
        relations: ['vehicle', 'vehicleOwner'],
      })
      .then((entities) => {
        return entities
          ? entities.map((e) => {
              return {
                id: e.id,
                ot: e.OT,
                vehicle: e.vehicle,
                vehicleOwner: e.vehicleOwner,
                state: e.state,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                deletedAt: e.deletedAt,
              };
            })
          : null;
      });
  }

  async findByUserId(userId: number): Promise<ServiceResult[] | null> {
    return readConnection
      .getRepository(ServiceEntity)
      .find({
        where: {
          vehicleOwner: {
            id: userId,
          },
        },
        relations: ['vehicle', 'vehicleOwner', 'comments', 'requests'],
      })
      .then((entity) => (entity ? entity : null));
  }

  async findByOT(ot: string): Promise<FindServiceByOTResult | null> {
    return null;
  }
}
