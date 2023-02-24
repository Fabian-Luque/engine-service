import { ICommand } from '@nestjs/cqrs';
import { VehicleProperties } from '../../domain/vehicle/Vehicle';

export class CreateVehicleCommand implements ICommand {
  constructor(readonly vehicle: VehicleProperties) {}
}
