import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './env/env.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
      isGlobal: true,
      envFilePath: !env ? '.env' : `.env.${env}`,
    }),
    EnvModule,
    TypeOrmModule.forRootAsync(typeormConfig),
  ],
})
export class AppModule {}
