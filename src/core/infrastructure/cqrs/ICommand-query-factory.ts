export interface ICommandQuery {
  execute(): void;
}

export interface ICommandQueryFactory<Actions> {
  exists(action: Actions): boolean;

  create<TDto>(action: Actions, props: TDto): ICommandQuery;

  getCommandsOrQueries(): any;
}
