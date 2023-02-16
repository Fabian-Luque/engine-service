import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import {
  VehicleOwner,
  Service,
  ServiceImplement,
  ServiceProperties,
  State,
} from 'src/service/domain/Service';
import { Vehicle } from './Vehicle';

type CreateServiceOptions = Readonly<{
  vehicle: number;
  vehicleOwner: VehicleOwner;
  typeService: number;
  commentOwner: string;
}>;

export class ServiceFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateServiceOptions): Service {
    return this.eventPublisher.mergeObjectContext(
      new ServiceImplement({
        ...options,
        billign: null,
        state: State.CREATED,
        diagnostic: '',
        evidences: [],
        comments: [],
        requestService: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    );
  }

  reconstitute(properties): Service {
    return this.eventPublisher.mergeObjectContext(
      new ServiceImplement(properties),
    );
  }
}
