import { ICommandHandler } from '@core/application/ICommand-handler';
import { CommandQueryError } from '@core/application/command-query.error';
import { IEventPublisher } from '@core/infrastructure/event-sourcing/publisher/IEvent-publisher';
import { Result } from '@core/shared/result';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { DeletePickUpPointsCommand } from './delete-pick-up-points.command';

type response =
  | Result<void>
  | Result<DeletePickUpPointsCommand>
  | CommandQueryError.NotFound<DeletePickUpPointsCommand>
  | CommandQueryError.DefaultError<DeletePickUpPointsCommand>;

export class DeletePickUpPointsCommandHandler implements ICommandHandler<DeletePickUpPointsCommand, response> {
  constructor(private repo: IPickUpPointsRepository, private eventPublisher: IEventPublisher) {}
  async execute(command: DeletePickUpPointsCommand): Promise<response> {
    const pickUpPointsExists = await this.repo.findOne({ uuid: command.uuid });
    if (!pickUpPointsExists.getValue()) return new CommandQueryError.NotFound<DeletePickUpPointsCommand>();

    await this.repo.remove({ uuid: command.uuid });
    return Result.ok<DeletePickUpPointsCommand>();
  }
}
