import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ServiceEntity } from './ServiceEntity';

import { BaseEntity } from './BaseEntity';

@Entity('Evidences')
export class EvidenceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  datail: string;

  @Column()
  imgUrl: string;

  @ManyToOne(() => ServiceEntity, (service) => service.evidences)
  service: ServiceEntity;
}
