import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('Diagnostics')
export class DiagnosticEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

}
