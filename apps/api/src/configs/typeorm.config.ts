import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

export const typeormConfig: TypeOrmModuleAsyncOptions = {
  imports: [EnvModule],
  inject: [EnvService],
  useFactory: (envService: EnvService) => {
    const config = buildDataSourceOptinos(envService);
    return {
      ...config,
    };
  },
};

export function buildDataSourceOptinos(
  envService: EnvService,
): DataSourceOptions {
  return {
    host: envService.get('DATABASE_HOST'),
    port: +envService.get('DATABASE_PORT'),
    username: envService.get('DATABASE_USERNAME'),
    password: envService.get('DATABASE_PASSWORD'),
    database: envService.get('DATABASE_NAME'),
    type: 'postgres',
    synchronize: false,
  };
}

const dataSourceOptions = buildDataSourceOptinos(
  new EnvService(new ConfigService()),
);

export default new DataSource({
  ...dataSourceOptions,
  migrations: [join(__dirname, 'dist/migrations/*.{ts,js}')],
  entities: [join(__dirname, 'dist/**/*.entity.{ts,js}')],
});
