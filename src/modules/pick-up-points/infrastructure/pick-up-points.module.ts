import { CqrsFactoryProvider } from '@core/infrastructure/cqrs/cqrs-factory.provider';
import { EventSourcingFactoryProvider } from '@core/infrastructure/event-sourcing/event-sourcing.factory.provider';
import { IEventSubscriber } from '@core/infrastructure/event-sourcing/subscriber/IEvent-subscriber';
import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { eventSourceConfig } from 'src/config/event-sourcing.config';
import { PickUpPointsMapper } from '../mapper/pick-up-points.mapper';
import { CreatePickUpPointsNestCommandHandler } from './cqrs/commands/create-pick-up-points.nest-command-handler';
import { DeletePickUpPointsNestCommandHandler } from './cqrs/commands/delete-pick-up-points.nest-command-handler';
import { UpdatePickUpPointsNestCommandHandler } from './cqrs/commands/update-pick-up-points.nest-command-handler';
import { COMMANDS, EVENTS, QUERIES, commandsAction, queriesAction } from './cqrs/contracts/command-query.types';
import { PickUpPointCreatedNestEventHandler } from './cqrs/events/pick-up-point-created.nest-event-handler';
import { GetPickUpPointsNestQueryHandler } from './cqrs/queries/get-pick-up-points.nest-query.handler';
import { ListPickUpPointsNestQueryHandler } from './cqrs/queries/list-pick-up-points.nest-query.handler';
import { PickUpPoint, PickUpPointSchema } from './database/entities/pick-up-point.entity';
import { pickUpPointsRepositoryProvider } from './database/repositories';
import { PickUpPointsController } from './http/pick-up-points.controller';
@Module({
  imports: [
    ConfigModule.forFeature(eventSourceConfig()),
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: PickUpPoint.name,
        schema: PickUpPointSchema,
      },
    ]),
  ],
  controllers: [PickUpPointsController],
  providers: [
    pickUpPointsRepositoryProvider,
    ListPickUpPointsNestQueryHandler,
    CreatePickUpPointsNestCommandHandler,
    UpdatePickUpPointsNestCommandHandler,
    DeletePickUpPointsNestCommandHandler,
    PickUpPointCreatedNestEventHandler,
    PickUpPointsMapper,
    GetPickUpPointsNestQueryHandler,
    {
      provide: 'PickUpPointsCommandFactory',
      useFactory: () => CqrsFactoryProvider.create<commandsAction>(COMMANDS),
    },
    {
      provide: 'PickUpPointsQueryFactory',
      useFactory: () => CqrsFactoryProvider.create<queriesAction>(QUERIES),
    },
    {
      provide: 'EventPublisher',
      useFactory: (config) => {
        const configConnection = config.get('event-sourcing');
        return EventSourcingFactoryProvider.createPublisher('rmq', {
          name: 'test1',
          url: configConnection.publisherUrl,
          queue: configConnection.publisherQueue,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'EventSubscriber',
      useFactory: (config) => {
        const configConnection = config.get('event-sourcing');
        return EventSourcingFactoryProvider.createSubscriber(
          'rmq',
          {
            name: 'test1',
            url: configConnection.publisherUrl,
            queue: configConnection.publisherQueue,
          },
          EVENTS,
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [],
})
export class PickUpPointsModule implements OnModuleInit {
  constructor(private readonly event$: EventBus, @Inject('EventSubscriber') private subscriber: IEventSubscriber) {}
  onModuleInit() {
    this.subscriber.subscribeEvents(this.event$.subject$);
  }
}
