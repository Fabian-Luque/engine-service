import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from 'libs/Transactional';
import { ErrorMessage } from '../../domain/ErrorMessage';
import { State } from '../../domain/service/Service';
import { ServiceFactory } from '../../domain/service/ServiceFactory';
import { ServiceRepository } from '../../domain/service/ServiceRepository';

import { InjectionToken } from '../InjectionToken';
import { UpdateServiceStateCommand } from './UpdateServiceStateCommand';

@CommandHandler(UpdateServiceStateCommand)
export class UpdateServiceStateHandler
  implements ICommandHandler<UpdateServiceStateCommand, void>
{
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;
  @Inject() private readonly serviceFactory: ServiceFactory;

  @Transactional()
  async execute(command: UpdateServiceStateCommand): Promise<void> {
    const service = await this.serviceRepository.findById(command.serviceId);
    if (!service)
      throw new NotFoundException(ErrorMessage.SERVICE_IS_NOT_FOUND);

    service.updateState(State[command.state]);
    await this.serviceRepository.save(service);
  }
}
