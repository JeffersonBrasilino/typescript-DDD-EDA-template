import { ICommandHandler } from '@core/application/ICommand-handler';
import { CommandQueryError } from '@core/application/command-query.error';
import { IEventPublisher } from '@core/infrastructure/event-sourcing/publisher/IEvent-publisher';
import { Result } from '@core/shared/result';
import { IPickUpPointsRepository } from '@module/pick-up-points/domain/contracts/IPick-up-points.repository';
import { PickUpPointsEntity } from '@module/pick-up-points/domain/entities/pick-up-points.entity';
import { LocationValueObject } from '@module/pick-up-points/domain/value-objects/location.value-object';
import { UpdatePickUpPointsCommand } from './update-pick-up-points.command';

type response =
  | Result<void>
  | Result<UpdatePickUpPointsCommand>
  | CommandQueryError.NotFound<UpdatePickUpPointsCommand>
  | CommandQueryError.DefaultError<UpdatePickUpPointsCommand>;

export class UpdatePickUpPointsCommandHandler implements ICommandHandler<UpdatePickUpPointsCommand, response> {
  constructor(private repo: IPickUpPointsRepository, private eventPublisher: IEventPublisher) {}
  async execute(command: UpdatePickUpPointsCommand): Promise<response> {
    const pickUpPointsExists = await this.repo.findOne({ uuid: command.uuid });
    if (!pickUpPointsExists.getValue()) return new CommandQueryError.NotFound<UpdatePickUpPointsCommand>();

    const locationOrError = LocationValueObject.create(command.location);
    if (locationOrError.isError)
      return new CommandQueryError.InvalidDomainData<UpdatePickUpPointsCommand>(locationOrError.getError() as string[]);

    const pickUpPointsOrError = PickUpPointsEntity.create({
      uuid: command.uuid,
      establishment: command.establishment,
      address: command.address,
      number: command.number,
      state: command.state,
      zipCode: command.zipCode,
      region: command.region,
      location: locationOrError.getValue(),
    });

    if (pickUpPointsOrError.isError)
      return new CommandQueryError.DefaultError<UpdatePickUpPointsCommand>(pickUpPointsOrError.getError() as string[]);

    const a = await this.repo.upsert(pickUpPointsOrError.getValue());
    return Result.ok<UpdatePickUpPointsCommand>();
  }
}
