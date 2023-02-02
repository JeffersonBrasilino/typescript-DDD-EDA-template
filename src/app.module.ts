import { HttpErrorFilter } from '@core/infrastructure/http/filters/http-error.filter';
import { HttpResponseTransformInterceptor } from '@core/infrastructure/http/interceptors/http-response-transform.interceptor';
import { ModulesModule } from '@module/modules.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { appConfig } from './config/app.config';
import { eventSourceConfig } from './config/event-sourcing.config';
@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: process.env.NODE_ENV === 'development' ? '.env' : '.env.test',
      expandVariables: process.env.NODE_ENV !== 'production',
      cache: true,
      isGlobal: true,
      load: [appConfig()],
    }),
    ModulesModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URI,
        useUnifiedTopology: true,
      }),
    }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: HttpResponseTransformInterceptor },
    { provide: APP_FILTER, useClass: HttpErrorFilter },
  ],
})
export class AppModule {}
