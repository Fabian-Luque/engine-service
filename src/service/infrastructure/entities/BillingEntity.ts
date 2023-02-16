import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('Billings')
export class BillingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

}
