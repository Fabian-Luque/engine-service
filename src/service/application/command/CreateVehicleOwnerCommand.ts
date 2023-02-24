import { ICommand } from '@nestjs/cqrs';
import { VehicleOwnerProperties } from '../../domain/vehicleOwner/VehicleOwner';

export class CreateVehicleOwnerCommand implements ICommand {
  constructor(readonly vehicleOwner: VehicleOwnerProperties) {}
}
