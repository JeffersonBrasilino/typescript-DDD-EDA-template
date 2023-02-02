import { ICommandQueryFactory } from './ICommand-query-factory';
import { CommandQueryFactory, CommandQueryProps } from './command-query.factory';

export class CqrsFactoryProvider {
  static create<Actions>(actions: CommandQueryProps): ICommandQueryFactory<Actions> {
    return new CommandQueryFactory<Actions>(actions);
  }
}
