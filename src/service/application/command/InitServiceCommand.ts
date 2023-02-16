import { ICommand } from '@nestjs/cqrs';
import { VehicleOwner } from '../../domain/Service';
import { Vehicle } from '../../domain/Vehicle';

export class InitServiceCommand implements ICommand {
  constructor(
    readonly vehicle: number,
    readonly vehicleOwner: VehicleOwner,
    readonly typeService: number,
    readonly commentOwner: string,
  ) {}
}
