import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ServiceEntity } from './ServiceEntity';

import { BaseEntity } from './BaseEntity';

@Entity('Requests')
export class RequestEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

  @Column()
  imgUrl: string;

  @ManyToOne(() => ServiceEntity, (service) => service.requests)
  service: ServiceEntity;
}
