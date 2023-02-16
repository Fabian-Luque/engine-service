import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../domain/ErrorMessage';
import { InjectionToken } from '../InjectionToken';
import { FindServicesByUserIdQuery } from './FindServicesByUserIdQuery';

import { ServiceQuery } from './ServiceQuery';
import { ServiceResult } from './ServiceResult';

@QueryHandler(FindServicesByUserIdQuery)
export class FindServicesByUserIdHandler
  implements IQueryHandler<FindServicesByUserIdQuery, ServiceResult[]>
{
  @Inject(InjectionToken.SERVICE_QUERY) readonly serviceQuery: ServiceQuery;

  async execute(query: FindServicesByUserIdQuery): Promise<ServiceResult[]> {
    const data = await this.serviceQuery.findByUserId(query.id);
    if (!data) throw new NotFoundException(ErrorMessage.SERVICE_IS_NOT_FOUND);
    return data;
  }
}