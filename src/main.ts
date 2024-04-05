import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';

import { HandlerError } from '@common/classes';
import { ErrorInterceptor, ResponseInterceptor } from '@common/interceptors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Start handlerError
  app.useGlobalFilters(new HandlerError());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('ToDo')
    .setDescription('The ToDo API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Start interceptors
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new ResponseInterceptor() as never,
    new ErrorInterceptor() as never,
  );

  // Start Logger
  app.useLogger(app.get(PinoLogger));

  await app.listen(3000);
}
bootstrap();
