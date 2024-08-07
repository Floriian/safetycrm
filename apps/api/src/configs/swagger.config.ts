import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('SafetyCRM')
  .addBearerAuth()
  .build();
