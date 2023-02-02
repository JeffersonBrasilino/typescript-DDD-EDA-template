import { ErrorMessage } from '../../domain/constants/messages';
import { ICommandQueryFactory, ICommandQuery } from './ICommand-query-factory';
export type commandQueryProps = { [key: string]: any };

export type CommandQueryProps = { [key: string]: any };

export class CommandQueryFactory<Actions> implements ICommandQueryFactory<Actions> {
  private _commandsOrQueriesMap: Map<Actions, any> = new Map();

  constructor(commands: CommandQueryProps) {
    this.register(commands);
  }

  public register(commands: CommandQueryProps): void {
    Object.entries(commands).map((command) => {
      this._commandsOrQueriesMap.set(command[0] as Actions, command[1]);
    });
  }

  public exists(action: Actions): boolean {
    return this._commandsOrQueriesMap.has(action);
  }

  public create<TDto>(action: Actions, props?: TDto): ICommandQuery {
    if (!this.exists(action)) {
      throw new Error(ErrorMessage.CommandUnavailableForGivenAction + action);
    }

    const commandInstance = this._commandsOrQueriesMap.get(action);

    return new commandInstance(props);
  }

  public getCommandsOrQueries() {
    return this._commandsOrQueriesMap.entries();
  }
}
