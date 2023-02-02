import { IMapper } from '@core/mapper/IMapper';
import { PickUpPointsEntity } from '@module/pick-up-points/domain/entities/pick-up-points.entity';
import { GetPickUpPointsResponseDto } from '../application/queries/get-pick-up-points/get-pick-up-points.response.dto';
import { ListPickUpPointsResponseDto } from '../application/queries/list-pick-up-points/list-pick-up-points.response.dto';

export class PickUpPointsMapper implements IMapper {
  toPersistence(domainData: PickUpPointsEntity): any {
    return {
      uuid: domainData.uuid,
      establishment: domainData.establishment,
      address: domainData.address,
      number: domainData.number,
      state: domainData.state,
      zipCode: domainData.zipCode,
      region: domainData.region,
      location: domainData.location,
    };
  }

  toDto<toDtoResponseContracts>(domainData: PickUpPointsEntity, convertTo?: string | boolean): toDtoResponseContracts {
    if (convertTo == 'GetPickUpPointsResponseDto')
      return PickUpPointsMapper.dtoGet(domainData) as toDtoResponseContracts;

    return PickUpPointsMapper.dtoList(domainData) as toDtoResponseContracts;
  }

  toDomain<PickUpPointsEntity>(rawData: Partial<any>): PickUpPointsEntity {
    const entityOrError = PickUpPointsEntity.create({
      establishment: rawData.establishment,
      address: rawData.address,
      number: rawData.number,
      state: rawData.state,
      zipCode: rawData.zipCode,
      region: rawData.region,
      location: rawData.location,
      distance: rawData.distance ?? undefined,
      uuid: rawData.uuid,
    });

    entityOrError.isError ? console.log('mapper error: ', entityOrError.getError()) : '';

    return entityOrError.getValue() as PickUpPointsEntity;
  }

  private static dtoGet(domainData: PickUpPointsEntity): GetPickUpPointsResponseDto {
    return {
      establishment: domainData.establishment,
      address: domainData.address,
      number: domainData.number,
      state: domainData.state,
      zipCode: domainData.zipCode,
      region: domainData.region,
      uuid: domainData.uuid,
    };
  }

  private static dtoList(domainData: PickUpPointsEntity): ListPickUpPointsResponseDto {
    return {
      establishment: domainData.establishment,
      address: domainData.address,
      number: domainData.number,
      state: domainData.state,
      zipCode: domainData.zipCode,
      region: domainData.region,
      location: domainData.location,
      distance: domainData.distance ?? undefined,
      uuid: domainData.uuid,
    };
  }
}
