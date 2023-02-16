import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { Vehicle, VehicleImplement, VehicleOwner } from './Vehicle';

type CreateVehicleOptions = Readonly<{
  vehicleOwner: VehicleOwner;
  patent: string;
}>;

export class VehicleFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateVehicleOptions): Vehicle {
    return this.eventPublisher.mergeObjectContext(
      new VehicleImplement({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    );
  }

  reconstitute(properties): Vehicle {
    return this.eventPublisher.mergeObjectContext(
      new VehicleImplement(properties),
    );
  }
}
