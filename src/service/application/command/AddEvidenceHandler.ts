import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from 'libs/Transactional';
import { ErrorMessage } from '../../domain/ErrorMessage';
import { ServiceFactory } from '../../domain/service/ServiceFactory';
import { ServiceRepository } from '../../domain/service/ServiceRepository';

import { InjectionToken } from '../InjectionToken';
import { AddEvidenceCommand } from './AddEvidenceCommand';

@CommandHandler(AddEvidenceCommand)
export class AddEvidenceHandler
  implements ICommandHandler<AddEvidenceCommand, void>
{
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;
  @Inject() private readonly serviceFactory: ServiceFactory;

  @Transactional()
  async execute(command: AddEvidenceCommand): Promise<void> {
    const service = await this.serviceRepository.findById(command.serviceId);
    if (!service)
      throw new NotFoundException(ErrorMessage.SERVICE_IS_NOT_FOUND);

    service.addEvidence(command);

    await this.serviceRepository.save(service);
  }
}
