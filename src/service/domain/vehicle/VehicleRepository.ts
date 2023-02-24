import { VehicleEntity } from '../../infrastructure/entities/VehicleEntity';
import { Vehicle } from './Vehicle';

export interface VehicleRepository {
  findByPatentOrCreate: (vehicle) => Promise<Vehicle>;
  save: (vehicle) => Promise<Vehicle>;
}
