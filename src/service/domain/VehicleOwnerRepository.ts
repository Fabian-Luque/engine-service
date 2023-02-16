import { VehicleOwner } from 'src/service/domain/Service';

export interface VehicleOwnerRepository {
  findByIdOrCreate: (vehicleOwner) => Promise<VehicleOwner>;
}
