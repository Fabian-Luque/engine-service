import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { BillingEntity } from './BillingEntity';
import { VehicleOwnerEntity } from './VehicleOwnerEntity';
import { CommentEntity } from './CommentEntity';
import { DiagnosticEntity } from './DiagnosticEntity';
import { EvidenceEntity } from './EvidenceEntity';
import { RequestEntity } from './RequestEntity';
import { VehicleEntity } from './VehicleEntity';

@Entity('Services')
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.services)
  vehicle: VehicleEntity;

  @ManyToOne(() => VehicleOwnerEntity, (vehicleOwner) => vehicleOwner.services)
  vehicleOwner: VehicleOwnerEntity;

  @Column()
  garageId: number;

  @Column()
  typeService: number;

  @Column()
  commentOwner: string;

  @Column()
  OT: string;

  @OneToMany(() => EvidenceEntity, (evidence) => evidence.service)
  evidences: EvidenceEntity[];

  // @OneToOne(() => DiagnosticEntity)
  // @JoinColumn()
  @Column()
  diagnostic: string;

  @Column()
  state: string;

  @OneToMany(() => CommentEntity, (comment) => comment.service)
  comments: CommentEntity[];

  @OneToMany(() => RequestEntity, (request) => request.service)
  requests: RequestEntity[];

  @OneToOne(() => BillingEntity)
  @JoinColumn()
  billing: BillingEntity;
}
