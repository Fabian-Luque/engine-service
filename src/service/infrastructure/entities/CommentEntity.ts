import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ServiceEntity } from './ServiceEntity';

import { BaseEntity } from './BaseEntity';

@Entity('Comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

  @Column()
  imgUrl: string;

  @ManyToOne(() => ServiceEntity, (service) => service.comments)
  service: ServiceEntity;
}
