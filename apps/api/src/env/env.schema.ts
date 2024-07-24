import { IsNotEmpty, IsNumberString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
export class EnvSchema {
  @IsNotEmpty()
  DATABASE_USERNAME: string;

  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsNotEmpty()
  @IsNumberString()
  DATABASE_PORT: string;

  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNotEmpty()
  AUTH_SECRET: string;
}

export const validateEnv = (env: Record<string, unknown>) => {
  const converted = plainToInstance(EnvSchema, env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(converted);

  const errorMessages = errors.map(
    (e) => `\x1b[41m ${Object.values(e.constraints)} \x1b[0m \n\n`,
  );

  if (errors.length > 0) throw new Error(errorMessages.toString());
  return converted;
};
