import { Provider } from '@nestjs/common';
import { PickUpPointsRepository } from './pick-up-points.repository';

export const pickUpPointsRepositoryProvider: Provider = {
  provide: 'IPickUpPointsRepository',
  useClass: PickUpPointsRepository,
};
