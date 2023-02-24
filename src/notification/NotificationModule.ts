import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EmailAdaptorImplement } from 'src/notification/infrastructure/adaptor/EmailAdaptorImplement';
import { PushAdaptorImplement } from 'src/notification/infrastructure/adaptor/PushAdaptorImplement';
import { NotificationRepositoryImplement } from 'src/notification/infrastructure/repository/NotificationRepositoryImplement';
import { NotificationQueryImplement } from 'src/notification/infrastructure/query/NotificationQueryImplement';

import { NotificationIntegrationController } from 'src/notification/interface/NotificationIntegrationController';
import { NotificationController } from 'src/notification/interface/NotificationController';

import { SendEmailHandler } from 'src/notification/application/command/email/SendEmailHandler';
import { SendPushHandler } from 'src/notification/application/command/push/SendPushHandler';
import { InjectionToken } from 'src/notification/application/InjectionToken';
import { FindNotificationHandler } from 'src/notification/application/query/FindNotificationHandler';

import { NotificationFactory } from 'src/notification/domain/NotificationFactory';

const infrastructure = [
  {
    provide: InjectionToken.EMAIL_ADAPTOR,
    useClass: EmailAdaptorImplement,
  },
  {
    provide: InjectionToken.PUSH_ADAPTOR,
    useClass: PushAdaptorImplement,
  },
  {
    provide: InjectionToken.NOTIFICATION_REPOSITORY,
    useClass: NotificationRepositoryImplement,
  },
  {
    provide: InjectionToken.NOTIFICATION_QUERY,
    useClass: NotificationQueryImplement,
  },
];

const application = [
  SendEmailHandler,
  SendPushHandler,
  FindNotificationHandler,
];

const domain = [NotificationFactory];

@Module({
  imports: [CqrsModule],
  providers: [...infrastructure, ...application, ...domain],
  controllers: [NotificationIntegrationController, NotificationController],
})
export class NotificationModule {}
