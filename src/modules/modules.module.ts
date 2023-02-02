import { Module } from '@nestjs/common';
import { PickUpPointsModule } from '@module/pick-up-points/infrastructure/pick-up-points.module';

const MODULES = [PickUpPointsModule];
@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class ModulesModule {}
