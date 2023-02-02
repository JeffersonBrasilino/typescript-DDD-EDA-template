/* eslint-disable @typescript-eslint/no-namespace */
export namespace ErrorMessage {
  export const ResultMustNotBeValidAndInvalid =
    'Invalid Operation. Result cant be both valid and invalid at the same time.';
  export const ResultMustBeValidOrInvalid = 'Invalid operation. Result must be valid or invalid';
  export const InvalidValueReturnedOnErrorValue = 'Invalid value is returned on function errorValue';
  export const CommandUnavailableForGivenAction = 'There is no command for this action';
  export const EntityNotFoundOnDB = 'Entity was not found on database';
}
