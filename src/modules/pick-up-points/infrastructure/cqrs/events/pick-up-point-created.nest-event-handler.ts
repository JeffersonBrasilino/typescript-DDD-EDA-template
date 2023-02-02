import { PickUpPointsCreatedEvent } from '@module/pick-up-points/application/events/pick-up-point-created/pick-up-point-created.event';
import { PickUpPointCreatedEventHandler } from '@module/pick-up-points/application/events/pick-up-point-created/pick-up-point-created.event.handler';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { Inject } from '@nestjs/common';
import { EventsHandler } from '@nestjs/cqrs';

@EventsHandler(PickUpPointsCreatedEvent)
export class PickUpPointCreatedNestEventHandler extends PickUpPointCreatedEventHandler {
  constructor(@Inject('IPickUpPointsRepository') private pickUpPointsRepo: IPickUpPointsRepository) {
    super();
  }
}
