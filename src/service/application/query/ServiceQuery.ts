import { ServiceResult } from './service/ServiceResult';
import { FindServiceByOTResult } from './service/FindServiceByOTResult';
import { FindServicesByGarageIdResult } from './service/FindServicesByGarageIdResult';

export interface ServiceQuery {
  findById: (id: number) => Promise<ServiceResult | null>;
  findByGarageId: (
    garageId: number,
  ) => Promise<FindServicesByGarageIdResult[] | null>;
  findByUserId: (userId: number) => Promise<ServiceResult[] | null>;
  findByOT: (ot: string) => Promise<FindServiceByOTResult | null>;
}
