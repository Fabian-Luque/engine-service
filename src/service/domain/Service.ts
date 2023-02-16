import { AggregateRoot } from '@nestjs/cqrs';
import { FinishServiceEvent } from './event/FinishServiceEvent';
import { InitServiceEvent } from './event/InitServiceEvent';
import { RequestServiceEvent } from './event/RequestServiceEvent';
import { StateUpdateEvent } from './event/StateUpdateEvent';
import { Vehicle } from './Vehicle';

export enum State {
  CREATED = 'CREATED',
  DIAGNOSIS = 'DIAGNOSIS',
  PROCESS = 'PROCESS',
  BLOCKED = 'BLOCKED',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  FINISHED = 'FINISHED',
}

export type ServiceEssentialProperties = Readonly<
  Required<{
    vehicle: number | any;
    vehicleOwner: VehicleOwner;
  }>
>;

export type ServiceOptionalProperties = Readonly<
  Partial<{
    state: State;
    billign: Billing | null;
    comments: Comment[];
    requestService: RequestService[] | null;
    diagnostic: string;
    evidences: Evidence[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }>
>;

export type ServiceProperties = ServiceEssentialProperties &
  Required<ServiceOptionalProperties>;
export interface Service {
  init: () => void;
  finish: () => void;
  generateOT: () => void;
  updateDiagnotic: (diagnosit: string) => void;
  addComment: (comment: Comment) => void;
  addRequestService: (request: RequestService) => void;
  updateState: (state: State) => void;
  addEvidence: (evidence: Evidence) => void;
}
export class ServiceImplement extends AggregateRoot implements Service {
  private readonly id: number;
  private readonly vehicle: Vehicle;
  private readonly vehicleOwner: VehicleOwner;
  private readonly typeService: number;
  private readonly commentOwner: string;
  private readonly creartedAt: Date;
  private OT: string;
  private state: State;
  private updatedAt: Date;
  private diagnostic: string;
  private deletedAt: Date | null;
  private billing: Billing | null;
  private comments: Comment[];
  private evidences: Evidence[] | null;
  private requestsService: RequestService[] | null;

  constructor(properties: ServiceProperties) {
    super();
    Object.assign(this, properties);
  }

  init(): void {
    this.apply(new InitServiceEvent(this.id));
    this.generateOT();
  }

  generateOT(): void {
    this.OT = `${this.vehicle}${this.vehicleOwner}`;
  }

  updateDiagnotic(diagnosit: string): void {
    this.diagnostic = diagnosit;
    this.updatedAt = new Date();
  }

  updateState(state: State): void {
    const oldState = this.state;
    this.state = state;
    this.updatedAt = new Date();
    this.apply(new StateUpdateEvent(this.id, oldState, this.state));
  }

  addComment(comment: Comment): void {
    if (!Array.isArray(this.comments)) this.comments = [];
    this.comments.push(comment);
    this.updatedAt = new Date();
  }

  addRequestService(request: RequestService): void {
    this.requestsService?.push(request);
    this.updatedAt = new Date();
    this.apply(new RequestServiceEvent(this.id));
  }

  addEvidence(evidence: Evidence): void {
    this.evidences?.push(evidence);
    this.updatedAt = new Date();
  }

  finish(): void {
    this.updateState(State.FINISHED);
    this.updatedAt = new Date();
    this.apply(new FinishServiceEvent(this.id));
  }
}

export interface Billing {
  number: number;
}
export interface Comment {
  detail: string;
  imgUrl: string;
}
export interface RequestService {
  id: number;
}
export interface VehicleOwner {
  id: number;
  name: string;
}
export interface Evidence {
  // id: number;
  detail: string;
  imgUrl: string;
}
