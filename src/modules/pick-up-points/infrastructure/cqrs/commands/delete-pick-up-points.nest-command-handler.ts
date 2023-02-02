import { IEventPublisher } from '@core/infrastructure/event-sourcing/publisher/IEvent-publisher';
import { DeletePickUpPointsCommand } from '@module/pick-up-points/application/commands/delete-pick-up-points/delete-pick-up-points.command';
import { DeletePickUpPointsCommandHandler } from '@module/pick-up-points/application/commands/delete-pick-up-points/delete-pick-up-points.command.handler';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeletePickUpPointsCommand)
export class DeletePickUpPointsNestCommandHandler extends DeletePickUpPointsCommandHandler {
  constructor(
    @Inject('IPickUpPointsRepository') private pickUpPointsRepo: IPickUpPointsRepository,
    @Inject('EventPublisher') private publisher: IEventPublisher,
  ) {
    super(pickUpPointsRepo, publisher);
  }
}
