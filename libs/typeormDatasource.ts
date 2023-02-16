import { DataSource } from 'typeorm';
import { Config } from '../src/Config';

import { NotificationEntity } from '../src/notification/infrastructure/entities/NotificationEntity';
import { ServiceEntity } from '../src/service/infrastructure/entities/ServiceEntity';
import { VehicleEntity } from '../src/service/infrastructure/entities/VehicleEntity';
import { VehicleOwnerEntity } from '../src/service/infrastructure/entities/VehicleOwnerEntity';
import { EvidenceEntity } from '../src/service/infrastructure/entities/EvidenceEntity';
import { CommentEntity } from '../src/service/infrastructure/entities/CommentEntity';
import { RequestEntity } from '../src/service/infrastructure/entities/RequestEntity';
import { BillingEntity } from '../src/service/infrastructure/entities/BillingEntity';

export const typeOrmConnectionDataSource = new DataSource({
  type: 'mysql',
  entities: [
    NotificationEntity,
    ServiceEntity,
    VehicleEntity,
    VehicleOwnerEntity,
    EvidenceEntity,
    CommentEntity,
    RequestEntity,
    BillingEntity,
  ],
  charset: 'utf8mb4_unicode_ci',
  logging: Config.DATABASE_LOGGING,
  host: Config.DATABASE_HOST,
  port: Config.DATABASE_PORT,
  database: Config.DATABASE_NAME,
  username: Config.DATABASE_USER,
  password: Config.DATABASE_PASSWORD,
  synchronize: Config.DATABASE_SYNC,
});
