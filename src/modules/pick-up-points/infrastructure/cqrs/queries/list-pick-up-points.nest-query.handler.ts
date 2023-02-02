import { ListPickUpPointsQuery } from '@module/pick-up-points/application/queries/list-pick-up-points/list-pick-up-points.query';
import { ListPickUpPointsQueryHandler } from '@module/pick-up-points/application/queries/list-pick-up-points/list-pick-up-points.query.handler';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { PickUpPointsMapper } from '@module/pick-up-points/mapper/pick-up-points.mapper';
import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(ListPickUpPointsQuery)
export class ListPickUpPointsNestQueryHandler extends ListPickUpPointsQueryHandler {
  constructor(
    @Inject('IPickUpPointsRepository') private pickUpPointsRepo: IPickUpPointsRepository,
    private pickUpPointsMapper: PickUpPointsMapper,
  ) {
    super(pickUpPointsRepo, pickUpPointsMapper);
  }
}
