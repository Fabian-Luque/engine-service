import { Inject } from '@nestjs/common';

import { writeConnection } from 'libs/DatabaseModule';
import { Vehicle } from '../../domain/vehicle/Vehicle';
import { VehicleProperties } from '../../domain/vehicle/Vehicle';
import { VehicleFactory } from '../../domain/vehicle/VehicleFactory';
import { VehicleRepository } from '../../domain/vehicle/VehicleRepository';
import { VehicleEntity } from '../entities/VehicleEntity';

export class VehicleRepositoryImplement implements VehicleRepository {
  @Inject() private readonly vehicleFactory: VehicleFactory;

  async save(data: Vehicle): Promise<Vehicle> {
    const model = data;
    const entity = this.modelToEntity(model);
    const vehicle = await writeConnection.manager
      .getRepository(VehicleEntity)
      .save(entity);
    return this.entityToModel(vehicle);
  }

  async findById(id: number): Promise<Vehicle | null> {
    const entity = await writeConnection.manager
      .getRepository(VehicleEntity)
      .findOne({
        where: { id: id },
        relations: [''],
      });
    return entity ? this.entityToModel(entity) : null;
  }

  async findByPatentOrCreate(vehicle): Promise<Vehicle> {
    let entity = await writeConnection.manager
      .getRepository(VehicleEntity)
      .findOne({
        where: { patent: vehicle.patent },
        relations: [''],
      });

    if (!entity) {
      const model = vehicle;
      const entityModel = this.modelToEntity(model);
      entity = await writeConnection.manager
        .getRepository(VehicleEntity)
        .save(entityModel);
    }

    return this.entityToModel(entity);
  }

  private modelToEntity(model: Vehicle) {
    const properties = JSON.parse(JSON.stringify(model)) as VehicleProperties;
    return {
      ...properties,
      createdAt: properties.createdAt,
      deletedAt: properties.deletedAt,
    };
  }

  private entityToModel(entity: VehicleEntity): Vehicle {
    return this.vehicleFactory.reconstitute({
      ...entity,
      id: entity.id,
      patent: entity.patent,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
    });
  }
}
