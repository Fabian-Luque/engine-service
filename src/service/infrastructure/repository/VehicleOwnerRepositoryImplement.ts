import { Inject } from '@nestjs/common';

import { writeConnection } from 'libs/DatabaseModule';

import { VehicleOwnerEntity } from '../entities/VehicleOwnerEntity';
import { VehicleOwner } from '../../domain/vehicleOwner/VehicleOwner';
import { VehicleOwnerFactory } from '../../domain/vehicleOwner/VehicleOwnerFactory';
import { VehicleOwnerRepository } from '../../domain/vehicleOwner/VehicleOwnerRepository';

export class VehicleOwnerRepositoryImplement implements VehicleOwnerRepository {
  @Inject() private readonly vehicleOwnerFactory: VehicleOwnerFactory;

  async save(data: VehicleOwner): Promise<VehicleOwner> {
    const model = data;
    const entity = this.modelToEntity(model);
    const vehicleOwner = await writeConnection.manager
      .getRepository(VehicleOwnerEntity)
      .save(entity);
    return this.entityToModel(vehicleOwner);
  }

  async findByIdentifierOrCreate(vehicleOwner): Promise<VehicleOwner> {
    let entity = await writeConnection.manager
      .getRepository(VehicleOwnerEntity)
      .findOne({
        where: { identifier: vehicleOwner.identifier },
        relations: [''],
      });

    if (!entity) {
      const model = vehicleOwner;
      const entityModel = this.modelToEntity(model);
      entity = await writeConnection.manager
        .getRepository(VehicleOwnerEntity)
        .save(entityModel);
    }
    return this.entityToModel(entity);
  }

  private modelToEntity(model: VehicleOwner) {
    const properties = JSON.parse(JSON.stringify(model)) as VehicleOwner;
    return {
      ...properties,
    };
  }

  private entityToModel(entity: VehicleOwnerEntity): VehicleOwner {
    return this.vehicleOwnerFactory.reconstitute({
      ...entity,
      id: entity.id,
      identifier: entity.identifier,
      name: entity.name,
      lastname: entity.lastname,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
    });
  }
}
