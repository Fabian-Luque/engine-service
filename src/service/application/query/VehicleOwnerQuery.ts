import { VehicleOwnerResult } from './vehicleOwner/VehicleOwnerResult';

export interface VehicleOwnerQuery {
  findByIdentifier: (identifier: string) => Promise<VehicleOwnerResult | null>;
}
