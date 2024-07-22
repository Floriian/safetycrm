import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { DataSource, DataSourceOptions } from 'typeorm';

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
    url: envService.get('DATABASE_URL'),
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
  entities: [join(__dirname, 'dist/**/*.entity.js')],
});
