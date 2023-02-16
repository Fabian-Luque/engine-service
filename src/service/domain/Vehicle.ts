import { AggregateRoot } from '@nestjs/cqrs';

export type ServiceEssentialProperties = Readonly<
  Required<{
    patent: string;
    vehicleOwner: VehicleOwner;
  }>
>;

export type VehicleOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type VehicleProperties = ServiceEssentialProperties &
  Required<VehicleOptionalProperties>;

export interface Vehicle {
  setPatent: (patent: string) => void;
}
export class VehicleImplement extends AggregateRoot implements Vehicle {
  private readonly id: number;
  private readonly vehicleOwner: VehicleOwner;
  private readonly creartedAt: Date;
  private patent: string;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(properties: VehicleProperties) {
    super();
    Object.assign(this, properties);
  }

  setPatent(patent: string): void {
    this.patent = patent;
  }
}

export interface VehicleOwner {
  id: number;
  name: string;
}
