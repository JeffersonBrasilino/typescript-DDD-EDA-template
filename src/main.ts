import './tracer';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentation } from '@core/infrastructure/http/api-http-documentation/swagger-documentation';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const appEnvironment = app.get(ConfigService).get('app');
  if (appEnvironment.env != 'production') new SwaggerDocumentation(app).generate(appEnvironment.docsUri);

  await app.listen(appEnvironment.port);
  console.log(`rodando no ambiente de ${appEnvironment.env} na porta ${appEnvironment.port}`);
}
bootstrap();
