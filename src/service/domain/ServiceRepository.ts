import { Service } from 'src/service/domain/Service';

export interface ServiceRepository {
  save: (account: Service | Service[]) => Promise<void>;
  findById: (id: number) => Promise<Service | null>;
  findByOT: (ot: string) => Promise<Service | null>;
  findByIdAndUpdate: (id: number, service: Service) => Promise<Service | null>;
}
