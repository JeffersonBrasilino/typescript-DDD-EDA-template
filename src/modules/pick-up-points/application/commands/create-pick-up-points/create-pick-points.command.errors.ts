import { CommandQueryError } from '@core/application/command-query.error';

export class LocationValueObjectError extends CommandQueryError.DefaultError<LocationValueObjectError> {
  constructor(msg: string | string[]) {
    super(msg);
  }
}
