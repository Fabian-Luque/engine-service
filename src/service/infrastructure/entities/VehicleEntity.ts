import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ServiceEntity } from './ServiceEntity';

@Entity('Vehicles')
export class VehicleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patent: string;

  @OneToMany(() => ServiceEntity, (service) => service.vehicle)
  services: ServiceEntity[];
}
