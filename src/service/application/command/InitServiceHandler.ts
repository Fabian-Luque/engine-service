import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from 'libs/Transactional';
import { ServiceFactory } from '../../domain/ServiceFactory';
import { ServiceRepository } from '../../domain/ServiceRepository';
import { VehicleOwnerRepository } from '../../domain/VehicleOwnerRepository';
import { VehicleRepository } from '../../domain/VehicleRepository';

import { InjectionToken } from '../InjectionToken';
import { InitServiceCommand } from './InitServiceCommand';

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
    const vehicleOwner = await this.vehicleOwnerRepository.findByIdOrCreate(
      command.vehicleOwner,
    );

    const service = this.serviceFactory.create({
      vehicle: command.vehicle,
      vehicleOwner,
      typeService: command.typeService,
      commentOwner: command.commentOwner,
    });
    service.init();

    await this.serviceRepository.save(service);
  }
}
