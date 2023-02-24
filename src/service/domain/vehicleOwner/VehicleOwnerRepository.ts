import { VehicleOwner } from './VehicleOwner';

export interface VehicleOwnerRepository {
  save: (vehicleOwner: VehicleOwner | VehicleOwner[]) => Promise<VehicleOwner>;
  findByIdentifierOrCreate: (vehicleOwner) => Promise<VehicleOwner>;
}
