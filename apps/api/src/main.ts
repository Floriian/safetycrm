import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validatorConfig } from './configs';
import * as cookieparser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  });

  app.useGlobalPipes(new ValidationPipe(validatorConfig));
  app.use(cookieparser());

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
