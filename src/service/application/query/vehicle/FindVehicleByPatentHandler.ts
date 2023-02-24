import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../../domain/ErrorMessage';
import { InjectionToken } from '../../InjectionToken';

import { VehicleResult } from './VehicleResult';
import { FindVehicleByPatentQuery } from './FindVehicleByPatentQuery';
import { VehicleQuery } from '../VehicleQuery';

@QueryHandler(FindVehicleByPatentQuery)
export class FindVehicleByPatentHandler
  implements IQueryHandler<FindVehicleByPatentQuery, VehicleResult | null>
{
  @Inject(InjectionToken.VEHICLE_QUERY) readonly vehicleQuery: VehicleQuery;

  async execute(
    query: FindVehicleByPatentQuery,
  ): Promise<VehicleResult | null> {
    const data = await this.vehicleQuery.findByPatent(query.patent);
    console.log(data);
    // if (!data) throw new NotFoundException(ErrorMessage.VEHICLE_IS_NOT_FOUND);
    return data;
  }
}
