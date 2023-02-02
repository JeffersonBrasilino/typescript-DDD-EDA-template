import { AggregateRoot } from '@core/domain/aggregate-root';
import { EntityProps } from '@core/domain/entity';
import { Result } from '@core/shared/result';
import { PickUpPointsCreatedEvent } from '../events/pick-up-points-created.event';
import { LocationValueObject } from '../value-objects/location.value-object';

export type pickUpPointsProps = {
  establishment: string;
  address: string;
  number: string;
  state: string;
  zipCode: string;
  region: string;
  location: LocationValueObject;
  distance?: string;
} & EntityProps;
export class PickUpPointsEntity extends AggregateRoot {
  readonly establishment: string;
  readonly address: string;
  readonly number: string;
  readonly state: string;
  readonly zipCode: string;
  readonly region: string;
  readonly location: LocationValueObject;
  readonly distance?: string;

  private constructor(props: pickUpPointsProps) {
    super(props.uuid);
    Object.assign(this, props);
  }

  static create(props: pickUpPointsProps): Result<PickUpPointsEntity> {
    const entity = new PickUpPointsEntity(props);
    entity.addEvent(new PickUpPointsCreatedEvent(props));

    return Result.ok<PickUpPointsEntity>(entity);
  }
}
