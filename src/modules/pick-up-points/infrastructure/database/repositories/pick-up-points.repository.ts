import { listProps } from '@core/infrastructure/database/repository/IRepository';
import { MongoBaseRepository } from '@core/infrastructure/database/repository/mongo-base.reposirory';
import { RepositoryError } from '@core/infrastructure/database/repository/repository.error';
import { Result } from '@core/shared/result';
import {
  listFilterProps,
  IPickUpPointsRepository,
} from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { PickUpPointsEntity } from '@module/pick-up-points/domain/entities/pick-up-points.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { PickUpPointsMapper } from '../../../mapper/pick-up-points.mapper';
import { PickUpPoint } from '../entities/pick-up-point.entity';

export class PickUpPointsRepository extends MongoBaseRepository<PickUpPointsEntity> implements IPickUpPointsRepository {
  constructor(
    @InjectModel(PickUpPoint.name)
    private readonly pickUpPointModel: Model<PickUpPoint>,
    private readonly mapper: PickUpPointsMapper,
  ) {
    super(pickUpPointModel, mapper);
  }

  async list(
    filter?: listFilterProps,
  ): Promise<Result<listProps<PickUpPointsEntity>> | RepositoryError<PickUpPointsEntity>> {
    try {
      const baseQuery: PipelineStage[] = [{ $sort: { distance: 1 } }];
      if (filter?.establishment) {
        const establishment = new RegExp(filter.establishment.replace(/[^\w\s]/gi, '.+').replace(' ', '.+'), 'i');
        baseQuery.push({
          $match: { establishment: { $regex: establishment } },
        });
      }

      baseQuery.push({
        $match: { enable: true },
      });

      if (filter?.latitude && filter?.longitude) {
        baseQuery.unshift({
          $geoNear: {
            near: { type: 'Point', coordinates: [filter.longitude, filter.latitude] },
            distanceField: 'distance',
            maxDistance: filter.distance ?? 10,
            spherical: true,
          },
        });
      }

      //calcula os parametros de paginação
      const paginateParams = this.getPaginationParams(filter?.page, filter?.perPage);
      //quantidade de registros pela query
      const count = await this.pickUpPointModel.count(baseQuery);
      //registros com paginação.
      const data = await this.pickUpPointModel
        .aggregate(baseQuery)
        .skip(paginateParams.skip)
        .limit(paginateParams.take);
      return Result.ok<listProps<PickUpPointsEntity>>({
        rows: data.map((row) => this.mapper.toDomain(row)),
        totalRows: count,
        perPage: paginateParams.take,
      });
    } catch (e) {
      return new RepositoryError<PickUpPointsEntity>(e as any[]);
    }
  }
}
