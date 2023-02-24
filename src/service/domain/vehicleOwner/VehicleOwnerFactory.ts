import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { VehicleOwner, VehicleOwnerImplement } from './VehicleOwner';

type CreateVehicleOwnerOptions = Readonly<{
  identifier: string;
  email: string;
  name: string;
  lastname: number;
}>;

export class VehicleOwnerFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateVehicleOwnerOptions): VehicleOwner {
    return this.eventPublisher.mergeObjectContext(
      new VehicleOwnerImplement({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    );
  }

  reconstitute(properties): VehicleOwner {
    return this.eventPublisher.mergeObjectContext(
      new VehicleOwnerImplement(properties),
    );
  }
}
