import { Result } from '../shared/result';
/**
 * classe de erro dos commands e querys geral, para criar novos erros que não existem ou que seja bem
 * especifico, usar esta classe
 * @param errorOrMessage erro a ser retornado (string | T)
 * @returns Result<T>
 */

export namespace CommandQueryError {
  export class NotFound<TCommand> extends Result<TCommand> {
    constructor() {
      super(false, 'Register not found.');
    }
  }

  export class InvalidDomainData<TCommand> extends Result<TCommand> {
    constructor(errorOrMessage: string | string[]) {
      super(false, errorOrMessage);
    }
  }

  export class DefaultError<TCommand> extends Result<TCommand> {
    constructor(errorOrMessage: string | string[]) {
      super(false, errorOrMessage);
    }
  }
}
