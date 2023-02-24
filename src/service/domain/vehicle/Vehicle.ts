import { AggregateRoot } from '@nestjs/cqrs';

export type ServiceEssentialProperties = Readonly<
  Required<{
    patent: string;
    model: string;
    brand: string;
    year: number;
    vin: string;
    img: string;
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
  private readonly creartedAt: Date;
  private patent: string;
  private model: string;
  private brand: string;
  private year: number;
  private img: string;
  private vin: string;
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
