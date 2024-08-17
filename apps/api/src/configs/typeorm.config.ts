import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeormConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const config = buildDataSourceOptinos(configService);
    return {
      ...config,
    };
  },
};

export function buildDataSourceOptinos(
  configService: ConfigService,
): DataSourceOptions {
  return {
    host: configService.get('DATABASE_HOST') || 'localhost',
    port: +configService.get('DATABASE_PORT') || 5432,
    username: configService.get('DATABASE_USERNAME') || 'safetycrm',
    password: configService.get('DATABASE_PASSWORD') || 'safetycrm',
    database: configService.get('DATABASE_NAME') || 'safetycrm',
    entities: [join(__dirname, '../../dist/***/***/*.entity.{ts,js}')],
    migrations: [join(__dirname, '../../dist/migrations/*.{ts,js}')],
    type: 'postgres',
    schema: 'public',
    synchronize: true,
    logging: 'all',
  };
}

const dataSourceOptions = buildDataSourceOptinos(new ConfigService());

export default new DataSource({
  ...dataSourceOptions,
});
