import { ICommand } from '@nestjs/cqrs';
export class InitServiceCommand implements ICommand {
  constructor(
    readonly vehicle: number,
    readonly vehicleOwner: number,
    readonly typeService: number,
    readonly commentOwner: string,
    readonly garageId: number,
  ) {}
}
