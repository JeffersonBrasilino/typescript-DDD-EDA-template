import { GetPickUpPointsQuery } from '@module/pick-up-points/application/queries/get-pick-up-points/get-pick-up-points.query';
import { GetPickUpPointsQueryHandler } from '@module/pick-up-points/application/queries/get-pick-up-points/get-pick-up-points.query.handler';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { PickUpPointsMapper } from '@module/pick-up-points/mapper/pick-up-points.mapper';
import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetPickUpPointsQuery)
export class GetPickUpPointsNestQueryHandler extends GetPickUpPointsQueryHandler {
  constructor(
    @Inject('IPickUpPointsRepository') private pickUpPointsRepo: IPickUpPointsRepository,
    private pickUpPointsMapper: PickUpPointsMapper,
  ) {
    super(pickUpPointsRepo, pickUpPointsMapper);
  }
}
