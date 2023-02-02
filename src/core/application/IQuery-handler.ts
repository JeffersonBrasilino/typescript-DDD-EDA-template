/**
 * interface reveladora de intenção dos manipuladores de consulta.
 * todo manipulador de consulta DEVE implementar esta classe.
 */
export interface IQueryHandler<TRequest = any, TResponse = any> {
  execute(query: TRequest): Promise<TResponse>;
}
