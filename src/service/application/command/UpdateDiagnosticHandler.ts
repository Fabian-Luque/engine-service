import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from 'libs/Transactional';
import { ErrorMessage } from '../../domain/ErrorMessage';
import { ServiceFactory } from '../../domain/ServiceFactory';
import { ServiceRepository } from '../../domain/ServiceRepository';

import { InjectionToken } from '../InjectionToken';
import { UpdateDiagnosticCommand } from './UpdateDiagnosticCommand';

@CommandHandler(UpdateDiagnosticCommand)
export class UpdateDiagnosticHandler
  implements ICommandHandler<UpdateDiagnosticCommand, void>
{
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;
  @Inject() private readonly serviceFactory: ServiceFactory;

  @Transactional()
  async execute(command: UpdateDiagnosticCommand): Promise<void> {
    const service = await this.serviceRepository.findById(command.serviceId);
    if (!service)
      throw new NotFoundException(ErrorMessage.SERVICE_IS_NOT_FOUND);

    service.updateDiagnotic(command.diagnostic);
    await this.serviceRepository.save(service);
  }
}
