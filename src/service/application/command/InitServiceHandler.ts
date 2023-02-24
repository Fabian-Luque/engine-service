import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from 'libs/Transactional';
import { InjectionToken } from '../InjectionToken';
import { InitServiceCommand } from './InitServiceCommand';
import { ServiceFactory } from '../../domain/service/ServiceFactory';
import { VehicleRepository } from '../../domain/vehicle/VehicleRepository';
import { ServiceRepository } from '../../domain/service/ServiceRepository';
import { VehicleOwnerRepository } from '../../domain/vehicleOwner/VehicleOwnerRepository';

@CommandHandler(InitServiceCommand)
export class InitServiceHandler
  implements ICommandHandler<InitServiceCommand, void>
{
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly vehicleRepository: VehicleRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly vehicleOwnerRepository: VehicleOwnerRepository;
  @Inject() private readonly serviceFactory: ServiceFactory;

  @Transactional()
  async execute(command: InitServiceCommand): Promise<void> {
    const service = this.serviceFactory.create({
      vehicle: command.vehicle,
      vehicleOwner: command.vehicleOwner,
      typeService: command.typeService,
      commentOwner: command.commentOwner,
      garageId: command.garageId,
    });
    service.init();

    await this.serviceRepository.save(service);
  }
}
