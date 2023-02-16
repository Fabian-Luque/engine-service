import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class AccountEntity extends BaseEntity {
  @PrimaryColumn({ type: 'binary', length: 16 })
  id: Buffer;

  @PrimaryGeneratedColumn()
  id2: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  balance: number;

  @Column({ type: 'datetime', precision: 6, nullable: true })
  lockedAt: Date | null;
}
