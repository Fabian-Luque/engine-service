import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../domain/ErrorMessage';
import { InjectionToken } from '../InjectionToken';
import { FindServicesByGarageIdQuery } from './FindServicesByGarageIdQuery';
import { FindServicesByGarageIdResult } from './FindServicesByGarageIdResult';
import { ServiceQuery } from './ServiceQuery';

@QueryHandler(FindServicesByGarageIdQuery)
export class FindServicesByGarageIdHandler
  implements
    IQueryHandler<FindServicesByGarageIdQuery, FindServicesByGarageIdResult[]>
{
  @Inject(InjectionToken.SERVICE_QUERY) readonly serviceQuery: ServiceQuery;

  async execute(
    query: FindServicesByGarageIdQuery,
  ): Promise<FindServicesByGarageIdResult[]> {
    console.log(query);
    const data = await this.serviceQuery.findByGarageId(query.id);
    console.log(data);
    if (!data) throw new NotFoundException(ErrorMessage.SERVICE_IS_NOT_FOUND);
    return data;
  }
}
