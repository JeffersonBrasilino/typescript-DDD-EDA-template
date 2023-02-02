import { DomainError } from '@core/domain/domain.error';
import { ValueObject } from '@core/domain/value-object';
import { Result } from '@core/shared/result';
export type LocationValueObjectProps = {
  coordinates: number[];
  type: 'Point' | 'Other';
};
export class LocationValueObject extends ValueObject {
  readonly type: string;
  readonly coordinates: number[];

  private constructor(props: LocationValueObjectProps) {
    super();
    this.coordinates = props.coordinates;
    this.type = props.type;
  }

  private static validate(props: LocationValueObject): Array<string> {
    const errors = [];
    if (props.coordinates.length != 2) errors.push('location não deve ter mais que dois valores.');
    return errors;
  }

  static create(props: LocationValueObjectProps): Result<LocationValueObject> {
    const validation = LocationValueObject.validate(props);
    if (validation.length > 0) return new DomainError(validation);

    return Result.ok(new LocationValueObject(props));
  }
}
