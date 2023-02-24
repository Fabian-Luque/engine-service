import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ServiceQuery } from '../ServiceQuery';
import { InjectionToken } from '../../InjectionToken';
import { ErrorMessage } from '../../../domain/ErrorMessage';
import { FindServicesByGarageIdQuery } from './FindServicesByGarageIdQuery';
import { FindServicesByGarageIdResult } from './FindServicesByGarageIdResult';

@QueryHandler(FindServicesByGarageIdQuery)
export class FindServicesByGarageIdHandler
  implements
    IQueryHandler<FindServicesByGarageIdQuery, FindServicesByGarageIdResult[]>
{
  @Inject(InjectionToken.SERVICE_QUERY) readonly serviceQuery: ServiceQuery;

  async execute(
    query: FindServicesByGarageIdQuery,
  ): Promise<FindServicesByGarageIdResult[]> {
    const data = await this.serviceQuery.findByGarageId(query.id);
    if (!data) throw new NotFoundException(ErrorMessage.SERVICE_IS_NOT_FOUND);
    return data;
  }
}
