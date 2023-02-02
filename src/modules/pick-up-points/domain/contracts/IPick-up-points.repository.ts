import { IRepository, queryProps } from '@core/infrastructure/database/repository/IRepository';
import { PickUpPointsEntity } from '../entities/pick-up-points.entity';

export type listFilterProps = {
  latitude?: number;
  longitude?: number;
  distance?: number;
  establishment?: string;
  enable?: boolean;
} & queryProps;
export interface IPickUpPointsRepository extends IRepository<PickUpPointsEntity> {}
