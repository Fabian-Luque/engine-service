import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from 'libs/Transactional';
import { PushAdaptor } from 'src/notification/application/adaptor/PushAdaptor';

import { SendPushCommand } from './SendPushCommand';

import { InjectionToken } from 'src/notification/application/InjectionToken';

import { NotificationFactory } from 'src/notification/domain/NotificationFactory';
import { NotificationRepository } from 'src/notification/domain/NotificationRepository';

@CommandHandler(SendPushCommand)
export class SendPushHandler implements ICommandHandler<SendPushCommand, void> {
  @Inject() private readonly notificationFactory: NotificationFactory;
  @Inject(InjectionToken.NOTIFICATION_REPOSITORY)
  private readonly notificationRepository: NotificationRepository;
  @Inject(InjectionToken.PUSH_ADAPTOR)
  private readonly pushAdaptor: PushAdaptor;

  @Transactional()
  async execute(command: SendPushCommand): Promise<void> {
    const notification = this.notificationFactory.create({
      ...command,
      id: this.notificationRepository.newId(),
    });
    await this.notificationRepository.save(notification);
    await this.pushAdaptor.sendPush(
      command.to,
      command.subject,
      command.content,
    );
  }
}
