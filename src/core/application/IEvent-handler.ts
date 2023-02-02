export interface IEventHandler<TRequest> {
  handle(query: TRequest): void;
}
