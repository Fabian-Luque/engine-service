import { Vehicle } from './Vehicle';

export interface VehicleRepository {
  findByIdOrCreate: (vehicle) => Promise<Vehicle>;
}
