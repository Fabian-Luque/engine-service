import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ServiceEntity } from './ServiceEntity';

@Entity('VehicleOwners')
export class VehicleOwnerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => ServiceEntity, (service) => service.vehicleOwner)
  services: ServiceEntity[];
}