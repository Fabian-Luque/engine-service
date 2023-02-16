import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../domain/ErrorMessage';
import { InjectionToken } from '../InjectionToken';
import { FindServiceByIdQuery } from './FindServiceByIdQuery';
import { ServiceResult } from './ServiceResult';
import { ServiceQuery } from './ServiceQuery';

@QueryHandler(FindServiceByIdQuery)
export class FindServiceByIdHandler
  implements IQueryHandler<FindServiceByIdQuery, ServiceResult>
{
  @Inject(InjectionToken.SERVICE_QUERY) readonly serviceQuery: ServiceQuery;

  async execute(query: FindServiceByIdQuery): Promise<ServiceResult> {
    const data = await this.serviceQuery.findById(query.id);
    console.log(data);
    if (!data) throw new NotFoundException(ErrorMessage.SERVICE_IS_NOT_FOUND);
    return data;
  }
}
