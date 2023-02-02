import { IQueryHandler } from '@core/application/IQuery-handler';
import { CommandQueryError } from '@core/application/command-query.error';
import { IMapper } from '@core/mapper/IMapper';
import { Result } from '@core/shared/result';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { GetPickUpPointsQuery } from './get-pick-up-points.query';
import { GetPickUpPointsResponseDto } from './get-pick-up-points.response.dto';

type response = Result<GetPickUpPointsResponseDto> | CommandQueryError.NotFound<GetPickUpPointsQuery>;
export class GetPickUpPointsQueryHandler implements IQueryHandler<GetPickUpPointsQuery, response> {
  constructor(private repo: IPickUpPointsRepository, private mapper: IMapper) {}
  async execute(params: GetPickUpPointsQuery): Promise<response> {
    const resultOrError = await this.repo.findOne({ uuid: params.uuid });
    if (resultOrError.isError)
      return new CommandQueryError.DefaultError<GetPickUpPointsQuery>(resultOrError.getError() as string[]);

    const resultData = resultOrError.getValue();
    if (resultData == null) return new CommandQueryError.NotFound<GetPickUpPointsQuery>();

    return Result.ok(this.mapper.toDto<GetPickUpPointsResponseDto>(resultData, 'GetPickUpPointsResponseDto'));
  }
}
