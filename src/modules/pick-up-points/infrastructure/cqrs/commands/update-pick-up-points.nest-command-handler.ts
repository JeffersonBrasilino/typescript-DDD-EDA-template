import { IEventPublisher } from '@core/infrastructure/event-sourcing/publisher/IEvent-publisher';
import { UpdatePickUpPointsCommand } from '@module/pick-up-points/application/commands/update-pick-up-points/update-pick-up-points.command';
import { UpdatePickUpPointsCommandHandler } from '@module/pick-up-points/application/commands/update-pick-up-points/update-pick-up-points.command.handler';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdatePickUpPointsCommand)
export class UpdatePickUpPointsNestCommandHandler extends UpdatePickUpPointsCommandHandler {
  constructor(
    @Inject('IPickUpPointsRepository') private pickUpPointsRepo: IPickUpPointsRepository,
    @Inject('EventPublisher') private publisher: IEventPublisher,
  ) {
    super(pickUpPointsRepo, publisher);
  }
}
