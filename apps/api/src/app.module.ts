import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './env/env.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

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
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
