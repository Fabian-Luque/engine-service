import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorMessage } from '../../../domain/ErrorMessage';
import { InjectionToken } from '../../InjectionToken';
import { FindVehicleOwnerByIdentifierQuery } from './FindVehicleOwnerByIdentifierQuery';
import { VehicleOwnerResult } from './VehicleOwnerResult';
import { VehicleOwnerQuery } from '../VehicleOwnerQuery';

@QueryHandler(FindVehicleOwnerByIdentifierQuery)
export class FindVehicleOwnerByIdentifierHandler
  implements
    IQueryHandler<FindVehicleOwnerByIdentifierQuery, VehicleOwnerResult | null>
{
  @Inject(InjectionToken.VEHICLE_OWNER_QUERY)
  readonly vehicleOwnerQuery: VehicleOwnerQuery;

  async execute(
    query: FindVehicleOwnerByIdentifierQuery,
  ): Promise<VehicleOwnerResult | null> {
    const data = await this.vehicleOwnerQuery.findByIdentifier(
      query.identifier,
    );
    // if (!data)
    //   throw new NotFoundException(ErrorMessage.VEHICLE_OWNER_IS_NOT_FOUND);
    return data;
  }
}
