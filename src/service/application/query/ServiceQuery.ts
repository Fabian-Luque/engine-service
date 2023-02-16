import { ServiceResult } from './ServiceResult';
import { FindServiceByOTResult } from './FindServiceByOTResult';
import { FindServicesByGarageIdResult } from './FindServicesByGarageIdResult';

export interface ServiceQuery {
  findById: (id: number) => Promise<ServiceResult | null>;
  findByGarageId: (
    garageId: number,
  ) => Promise<FindServicesByGarageIdResult[] | null>;
  findByUserId: (userId: number) => Promise<ServiceResult[] | null>;
  findByOT: (ot: string) => Promise<FindServiceByOTResult | null>;
}
