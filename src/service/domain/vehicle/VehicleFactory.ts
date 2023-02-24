import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { Vehicle, VehicleImplement } from './Vehicle';

type CreateVehicleOptions = Readonly<{
  patent: string;
  model: string;
  brand: string;
  year: number;
  vin: string;
  img: string;
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
