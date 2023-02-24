import { AggregateRoot } from '@nestjs/cqrs';

export type VehicleOwnerEssentialProperties = Readonly<
  Required<{
    identifier: string;
    email: string;
    name: string;
    lastname: number;
  }>
>;

export type VehicleOwnerOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type VehicleOwnerProperties = VehicleOwnerEssentialProperties &
  Required<VehicleOwnerOptionalProperties>;

export interface VehicleOwner {}

export class VehicleOwnerImplement
  extends AggregateRoot
  implements VehicleOwner
{
  private readonly id: number;
  private readonly creartedAt: Date;
  private identifier: string;
  private email: string;
  private name: string;
  private lastname: number;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(properties: VehicleOwnerProperties) {
    super();
    Object.assign(this, properties);
  }
}
