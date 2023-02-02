import { Result } from '../../../shared/result';
import { RepositoryError } from './repository.error';

export type queryProps = {
  page?: number;
  perPage?: number;
};
export type listProps<T> = {
  rows: T[];
  perPage: number;
  totalRows: number;
};
export interface IRepository<T> {
  getPaginationParams(page: number, perPage?: number);

  list<TFilters extends queryProps>(filter?: TFilters): Promise<Result<listProps<T>> | RepositoryError<T>>;

  findOne(filter: Partial<unknown>): Promise<Result<T> | RepositoryError<T>>;

  find(filter: Partial<any>): Promise<T[]>;

  upsert(data: T): Promise<Result<T> | RepositoryError<T>>;

  remove(filter: Partial<any>): Promise<any>;

  isValidIdKey(_id: string): boolean;
}
