import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig, validatorConfig } from './configs';
import * as cookieparser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  });

  app.useGlobalPipes(new ValidationPipe(validatorConfig));
  app.use(cookieparser());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
