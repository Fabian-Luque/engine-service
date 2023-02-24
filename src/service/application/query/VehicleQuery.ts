import { VehicleResult } from './vehicle/VehicleResult';

export interface VehicleQuery {
  findByPatent: (patent: string) => Promise<VehicleResult | null>;
}
