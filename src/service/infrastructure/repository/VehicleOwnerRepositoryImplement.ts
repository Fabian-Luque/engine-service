import { Inject } from '@nestjs/common';

import { writeConnection } from 'libs/DatabaseModule';
import { Service, ServiceProperties, State } from '../../domain/Service';
import { ServiceFactory } from '../../domain/ServiceFactory';
import { ServiceRepository } from '../../domain/ServiceRepository';
import { CommentEntity } from '../entities/CommentEntity';
import { ServiceEntity } from '../entities/ServiceEntity';

export class ServiceRepositoryImplement implements ServiceRepository {
  @Inject() private readonly serviceFactory: ServiceFactory;

  async save(data: Service): Promise<void> {
    const model = data;
    const entity = this.modelToEntity(model);
    await writeConnection.manager.getRepository(ServiceEntity).save(entity);
    const comments = entity.comments.map((comment) => {
      return { ...comment, service: entity };
    });
    await writeConnection.manager.getRepository(CommentEntity).save(comments);
  }

  async findById(id: number): Promise<Service | null> {
    const entity = await writeConnection.manager
      .getRepository(ServiceEntity)
      .findOne({
        where: { id: id },
        relations: ['vehicle', 'vehicleOwner', 'comments'],
      });
    return entity ? this.entityToModel(entity) : null;
  }

  async findByIdAndUpdate(
    id: number,
    service: Service,
  ): Promise<Service | null> {
    const entity = await writeConnection.manager
      .getRepository(ServiceEntity)
      .findOneBy({ id: id });
    return entity ? this.entityToModel(entity) : null;
  }
  async findByOT(ot: string): Promise<Service | null> {
    const entity = await writeConnection.manager
      .getRepository(ServiceEntity)
      .findOneBy({ OT: ot });
    return entity ? this.entityToModel(entity) : null;
  }

  private modelToEntity(model: Service) {
    const properties = JSON.parse(JSON.stringify(model)) as ServiceProperties;
    return {
      ...properties,
      diagnostic: properties.diagnostic,
      createdAt: properties.createdAt,
      deletedAt: properties.deletedAt,
    };
  }

  private entityToModel(entity: ServiceEntity): Service {
    return this.serviceFactory.reconstitute({
      ...entity,
      id: entity.id,
      state: State[entity.state],
      commentOwner: entity.commentOwner,
      typeService: entity.typeService,
      billign: entity.billing,
      evidences: entity.evidences,
      comments: entity.comments,
      requestService: entity.requests,
      createdAt: entity.createdAt,
      deletedAt: entity.deletedAt,
    });
  }
}
