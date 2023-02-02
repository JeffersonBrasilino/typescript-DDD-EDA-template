import { IEventPublisher } from '@core/infrastructure/event-sourcing/publisher/IEvent-publisher';
import { CreatePickUpPointsCommand } from '@module/pick-up-points/application/commands/create-pick-up-points/create-pick-up-points.command';
import { CreatePickUpPointsCommandHandler } from '@module/pick-up-points/application/commands/create-pick-up-points/create-pick-up-points.command.handler';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreatePickUpPointsCommand)
export class CreatePickUpPointsNestCommandHandler extends CreatePickUpPointsCommandHandler {
  constructor(
    @Inject('IPickUpPointsRepository') private pickUpPointsRepo: IPickUpPointsRepository,
    @Inject('EventPublisher') private publisher: IEventPublisher,
  ) {
    super(pickUpPointsRepo, publisher);
  }
}
