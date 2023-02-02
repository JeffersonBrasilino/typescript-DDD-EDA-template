import { IQueryHandler } from '@core/application/IQuery-handler';
import { CommandQueryError } from '@core/application/command-query.error';
import { listProps } from '@core/infrastructure/database/repository/IRepository';
import { IMapper } from '@core/mapper/IMapper';
import { Result } from '@core/shared/result';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { PickUpPointsEntity } from '@module/pick-up-points/domain/entities/pick-up-points.entity';
import { ListPickUpPointsQuery } from './list-pick-up-points.query';
import { ListPickUpPointsResponseDto } from './list-pick-up-points.response.dto';

type response =
  | Result<listProps<ListPickUpPointsResponseDto>>
  | CommandQueryError.DefaultError<ListPickUpPointsQueryHandler>;
export class ListPickUpPointsQueryHandler implements IQueryHandler<ListPickUpPointsQuery, response> {
  constructor(private repo: IPickUpPointsRepository, private mapper: IMapper) {}
  async execute(query: ListPickUpPointsQuery): Promise<response> {
    const result = await this.repo.list(query);
    if (result.isError) {
      return new CommandQueryError.DefaultError<ListPickUpPointsQueryHandler>(result.getError().toString());
    }
    const { rows, perPage, totalRows } = result.getValue() as listProps<PickUpPointsEntity>;
    return Result.ok({
      rows: rows.map((row) => this.mapper.toDto<ListPickUpPointsResponseDto>(row)),
      perPage,
      totalRows,
    });
  }
}
