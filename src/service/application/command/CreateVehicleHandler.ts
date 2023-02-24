import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from 'libs/Transactional';
import { Vehicle } from '../../domain/vehicle/Vehicle';
import { VehicleFactory } from '../../domain/vehicle/VehicleFactory';
import { VehicleRepository } from '../../domain/vehicle/VehicleRepository';
import { VehicleEntity } from '../../infrastructure/entities/VehicleEntity';

import { InjectionToken } from '../InjectionToken';
import { CreateVehicleCommand } from './CreateVehicleCommand';

@CommandHandler(CreateVehicleCommand)
export class CreateVehicleHandler
  implements ICommandHandler<CreateVehicleCommand, Vehicle>
{
  @Inject(InjectionToken.VEHICLE_REPOSITORY)
  private readonly vehicleRepository: VehicleRepository;
  @Inject() private readonly vehicleFactory: VehicleFactory;

  @Transactional()
  async execute(command: CreateVehicleCommand): Promise<Vehicle> {
    console.log('handler');
    const vehicle = this.vehicleFactory.create(command.vehicle);
    return await this.vehicleRepository.save(vehicle);
  }
}
