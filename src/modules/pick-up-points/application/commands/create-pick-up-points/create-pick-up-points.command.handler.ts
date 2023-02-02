import { ICommandHandler } from '@core/application/ICommand-handler';
import { CommandQueryError } from '@core/application/command-query.error';
import { Result } from '@core/shared/result';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { PickUpPointsEntity } from '@module/pick-up-points/domain/entities/pick-up-points.entity';
import { LocationValueObject } from '@module/pick-up-points/domain/value-objects/location.value-object';
import { LocationValueObjectError } from './create-pick-points.command.errors';
import { CreatePickUpPointsCommand } from './create-pick-up-points.command';
import { IEventPublisher } from '@core/infrastructure/event-sourcing/publisher/IEvent-publisher';

type response =
  | LocationValueObjectError
  | Result<CreatePickUpPointsCommand>
  | CommandQueryError.DefaultError<CreatePickUpPointsCommand>
  | void;
export class CreatePickUpPointsCommandHandler implements ICommandHandler<CreatePickUpPointsCommand, response> {
  constructor(private repo: IPickUpPointsRepository, private eventPublisher: IEventPublisher) {}
  async execute(command: CreatePickUpPointsCommand): Promise<response> {
    const validateDataDomain = command.data.map((data) => {
      const locationOrError = LocationValueObject.create(data.location);
      if (locationOrError.isError) return new LocationValueObjectError(locationOrError.getError() as string[]);

      const pickUpPointsOrError = PickUpPointsEntity.create({
        establishment: data.establishment,
        address: data.address,
        number: data.number,
        state: data.state,
        zipCode: data.zipCode,
        region: data.region,
        location: locationOrError.getValue(),
      });

      if (pickUpPointsOrError.isError)
        return new CommandQueryError.DefaultError<CreatePickUpPointsCommand>(
          pickUpPointsOrError.getError() as string[],
        );

      return pickUpPointsOrError;
    });

    const combineResultValidateDataDomain = Result.combine(validateDataDomain);
    if (combineResultValidateDataDomain.isError) {
      return combineResultValidateDataDomain;
    }

    const resultdb = await Promise.all(
      validateDataDomain.map(async (pickUpPointsOrError) => {
        return await this.repo.upsert(pickUpPointsOrError.getValue() as PickUpPointsEntity);
      }),
    );

    const checkError = Result.combine(resultdb);
    if (checkError.isError) {
      return new CommandQueryError.DefaultError<CreatePickUpPointsCommand>(checkError.getError() as string[]);
    }
    //const events = pickUpPointsOrError.getValue().domainEvents;
    //this.publishEvents(events);
    return Result.ok<CreatePickUpPointsCommand>();
  }
  /*   private publishEvents(events: any[]) {
    for (const event of events) {
      this.eventPublisher.publish(event);
    }
  } */
}
