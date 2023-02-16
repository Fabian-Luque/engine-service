import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InitServiceHandler } from './application/command/InitServiceHandler';
import { InjectionToken } from './application/InjectionToken';
import { ServiceFactory } from './domain/ServiceFactory';
import { ServiceRepositoryImplement } from './infrastructure/repository/ServiceRepositoryImplement';
import { ServiceController } from './interface/ServiceController';
import { ServiceQueryImplement } from 'src/service/infrastructure/query/ServiceQueryImplement';

import { ServiceDomainService } from 'src/service/domain/ServiceDomainService';
import { FindServiceByIdHandler } from './application/query/FindServiceByIdHandler';
import { FindServicesByGarageIdHandler } from './application/query/FindServicesByGarageIdHandler';
import { AddCommentHandler } from './application/command/AddCommentHandler';
import { UpdateServiceStateHandler } from './application/command/UpdateServiceStateHandler';
import { UpdateDiagnosticHandler } from './application/command/UpdateDiagnosticHandler';
import { VehicleRepositoryImplement } from './infrastructure/repository/VehicleRepositoryImplement';
import { VehicleFactory } from './domain/VehicleFactory';
import { FindServicesByUserIdHandler } from './application/query/FindServicesByUserIdHandler';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.SERVICE_REPOSITORY,
    useClass: ServiceRepositoryImplement,
  },
  {
    provide: InjectionToken.VEHICLE_REPOSITORY,
    useClass: VehicleRepositoryImplement,
  },
  {
    provide: InjectionToken.VEHICLE_OWNER_REPOSITORY,
    useClass: ServiceRepositoryImplement,
  },
  {
    provide: InjectionToken.SERVICE_QUERY,
    useClass: ServiceQueryImplement,
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
];

const domain = [
  // ServiceDomainService,
  ServiceFactory,
  VehicleFactory,
];

@Module({
  imports: [CqrsModule],
  controllers: [ServiceController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class ServiceModule {}
