import { Model, isValidObjectId } from 'mongoose';
import { IMapper } from '../../../mapper/IMapper';
import { Result } from '../../../shared/result';
import { IRepository, listProps, queryProps } from '../../database/repository/IRepository';
import { RepositoryError } from '../../database/repository/repository.error';

export abstract class MongoBaseRepository<T> implements IRepository<T> {
  constructor(private schema: Model<any>, private dataMapper: IMapper) {}

  getPaginationParams(page: number, perPage?: number): { take: number; skip: number } {
    perPage = perPage ?? 10; //default 10 registros
    const pageNumber = page ? page - 1 : 0;
    const skip = perPage * pageNumber;
    return { take: perPage, skip: skip };
  }

  async list(filter?: queryProps): Promise<Result<listProps<T>> | RepositoryError<T>> {
    try {
      filter = filter ?? {};
      const { take, skip } = this.getPaginationParams(filter.page, filter.perPage);
      const countResult = await this.schema.count({ where: filter });
      const rows = await this.schema.find(filter).skip(skip).limit(take);

      return Result.ok<listProps<T>>({
        rows: rows.map((row) => this.dataMapper.toDomain(row)),
        totalRows: countResult,
        perPage: take,
      });
    } catch (error) {
      return new RepositoryError<T>(error as any[]);
    }
  }

  public async findOne(filter: Partial<unknown>): Promise<Result<T> | RepositoryError<T>> {
    try {
      const result = await this.schema.findOne(filter);
      return Result.ok(result ? (this.dataMapper.toDomain(result) as T) : null);
    } catch (error) {
      return new RepositoryError<T>(error as any[]);
    }
  }

  async find(filter: Partial<any>): Promise<T[]> {
    const result = await this.schema.find(filter);
    return result ? this.dataMapper.toDomain(result) : [];
  }

  async upsert(data: T): Promise<Result<T> | RepositoryError<T>> {
    try {
      const dataToPersist = this.dataMapper.toPersistence(data);
      const result = await this.schema.findOneAndUpdate({ uuid: dataToPersist.uuid }, dataToPersist, {
        upsert: true,
        returnDocument: 'after',
      });
      return Result.ok(this.dataMapper.toDomain(result) as T);
    } catch (error) {
      console.log('deu ruim');
      return new RepositoryError(error as any[]);
    }
  }

  async remove(filter: Partial<any>) {
    return await this.schema.remove(filter);
  }

  isValidIdKey(_id: string): boolean {
    return isValidObjectId(_id);
  }
}
