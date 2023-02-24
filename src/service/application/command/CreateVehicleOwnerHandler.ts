import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from 'libs/Transactional';
import { VehicleFactory } from '../../domain/vehicle/VehicleFactory';
import { VehicleRepository } from '../../domain/vehicle/VehicleRepository';
import { VehicleOwner } from '../../domain/vehicleOwner/VehicleOwner';
import { VehicleOwnerFactory } from '../../domain/vehicleOwner/VehicleOwnerFactory';
import { VehicleOwnerRepository } from '../../domain/vehicleOwner/VehicleOwnerRepository';

import { InjectionToken } from '../InjectionToken';
import { CreateVehicleOwnerCommand } from './CreateVehicleOwnerCommand';

@CommandHandler(CreateVehicleOwnerCommand)
export class CreateVehicleOwnerHandler
  implements ICommandHandler<CreateVehicleOwnerCommand, VehicleOwner>
{
  @Inject(InjectionToken.VEHICLE_OWNER_REPOSITORY)
  private readonly vehicleOwnerRepository: VehicleOwnerRepository;
  @Inject() private readonly vehicleOwnerFactory: VehicleOwnerFactory;

  @Transactional()
  async execute(command: CreateVehicleOwnerCommand): Promise<VehicleOwner> {
    const vehicleOwner = this.vehicleOwnerFactory.create(command.vehicleOwner);
    return await this.vehicleOwnerRepository.save(vehicleOwner);
  }
}
