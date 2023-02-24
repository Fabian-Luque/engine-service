/* eslint-disable @typescript-eslint/no-empty-function */
import { CqrsModule } from '@nestjs/cqrs';
import { Logger, Module, Provider } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { InjectionToken } from './application/InjectionToken';
import { VehicleFactory } from './domain/vehicle/VehicleFactory';
import { ServiceFactory } from './domain/service/ServiceFactory';
import { ServiceController } from './interface/ServiceController';
import { AddCommentHandler } from './application/command/AddCommentHandler';
import { InitServiceHandler } from './application/command/InitServiceHandler';
import { VehicleOwnerFactory } from './domain/vehicleOwner/VehicleOwnerFactory';
import { CreateVehicleHandler } from './application/command/CreateVehicleHandler';
import { VehicleQueryImplement } from './infrastructure/query/VehicleQueryImplement';
import { ServiceDomainService } from 'src/service/domain/service/ServiceDomainService';
import { UpdateDiagnosticHandler } from './application/command/UpdateDiagnosticHandler';
import { FindServiceByIdHandler } from './application/query/service/FindServiceByIdHandler';
import { UpdateServiceStateHandler } from './application/command/UpdateServiceStateHandler';
import { VehicleOwnerQueryImplement } from './infrastructure/query/VehicleOwnerQueryImplement';
import { ServiceQueryImplement } from 'src/service/infrastructure/query/ServiceQueryImplement';
import { FindVehicleByPatentHandler } from './application/query/vehicle/FindVehicleByPatentHandler';
import { ServiceRepositoryImplement } from './infrastructure/repository/ServiceRepositoryImplement';
import { VehicleRepositoryImplement } from './infrastructure/repository/VehicleRepositoryImplement';
import { FindServicesByUserIdHandler } from './application/query/service/FindServicesByUserIdHandler';
import { FindServicesByGarageIdHandler } from './application/query/service/FindServicesByGarageIdHandler';
import { VehicleOwnerRepositoryImplement } from './infrastructure/repository/VehicleOwnerRepositoryImplement';
import { FindVehicleOwnerByIdentifierHandler } from './application/query/vehicleOwner/FindVehicleOwnerByIdentifierHandler';
import { CreateVehicleOwnerHandler } from './application/command/CreateVehicleOwnerHandler';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.SERVICE_REPOSITORY,
    useClass: ServiceRepositoryImplement,
  },
  {
    provide: InjectionToken.SERVICE_QUERY,
    useClass: ServiceQueryImplement,
  },
  {
    provide: InjectionToken.VEHICLE_REPOSITORY,
    useClass: VehicleRepositoryImplement,
  },
  {
    provide: InjectionToken.VEHICLE_QUERY,
    useClass: VehicleQueryImplement,
  },
  {
    provide: InjectionToken.VEHICLE_OWNER_REPOSITORY,
    useClass: VehicleOwnerRepositoryImplement,
  },
  {
    provide: InjectionToken.VEHICLE_OWNER_QUERY,
    useClass: VehicleOwnerQueryImplement,
  },
];

const application = [
  InitServiceHandler,
  AddCommentHandler,
  UpdateServiceStateHandler,
  UpdateDiagnosticHandler,
  FindServiceByIdHandler,
  FindServicesByGarageIdHandler,
  FindServicesByUserIdHandler,
  FindVehicleOwnerByIdentifierHandler,
  FindVehicleByPatentHandler,
  CreateVehicleHandler,
  CreateVehicleOwnerHandler,
];

const domain = [
  // ServiceDomainService,
  ServiceFactory,
  VehicleFactory,
  VehicleOwnerFactory,
];

@Module({
  imports: [CqrsModule],
  controllers: [ServiceController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class ServiceModule {
  // CRONS
  /**
   *  Notificaion por servicios no pagados y que llevan mas de 1 dia
   
   */
  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async notifyServiceUnpaid(): Promise<void> {}
}
