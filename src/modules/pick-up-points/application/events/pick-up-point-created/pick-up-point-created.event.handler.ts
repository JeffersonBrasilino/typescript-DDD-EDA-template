import { IEventHandler } from '@core/application/IEvent-handler';
import { PickUpPointsCreatedEvent } from './pick-up-point-created.event';

export abstract class PickUpPointCreatedEventHandler implements IEventHandler<PickUpPointsCreatedEvent> {
  handle(query: PickUpPointsCreatedEvent): void {
    console.log('evento recebido...', query);
  }
}
