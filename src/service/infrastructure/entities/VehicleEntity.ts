import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ServiceEntity } from './ServiceEntity';

@Entity('Vehicles')
export class VehicleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  patent: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  year: number;

  @Column()
  img: string;

  @Column()
  vin: string;

  @OneToMany(() => ServiceEntity, (service) => service.vehicle)
  services: ServiceEntity[];
}
