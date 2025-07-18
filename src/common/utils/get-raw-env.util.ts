// Core
import type { ConfigService } from '@nestjs/config';
import type { PartialDeep } from 'type-fest';
import * as dotenv from 'dotenv';

// Interfaces & Types
import type { GetEnv } from '../interfaces/get-env.interface';
import type { Environment } from '../enums/environment.enum';
import type { AppType } from '../enums/app-type.enum';

dotenv.config(); // Load environment variables from .env file

/**
 * Retrieves raw environment configuration values either from the `ConfigService` or directly from
 * environment variables if the `ConfigService` is not provided.
 *
 * @param configService - An optional instance of `ConfigService` used to fetch configuration values.
 * If not provided, the function will fall back to using `process.env` to retrieve environment variables.
 *
 * @returns A partial deep object of type `GetEnv` containing the environment configuration values.
 * The structure includes the following sections:
 * - `node`: Node.js application settings such as port, environment, app type, and app name.
 * - `swagger`: Swagger documentation settings such as enabled status, title, description, version, and path.
 * - `postgres`: PostgreSQL connection settings including host, port, user, password, and database.
 * - `rabbitmq`: RabbitMQ connection settings including the URL.
 */
export function getRawEnv(configService?: ConfigService): PartialDeep<GetEnv> {
  if (!configService) {
    return {
      node: {
        port: process.env.PORT,
        nodeEnv: process.env.NODE_ENV,
        appType: process.env.APP_TYPE,
        appName: process.env.APP_NAME,
      },
      swagger: {
        enabled: process.env.SWAGGER_ENABLED,
        title: process.env.SWAGGER_TITLE,
        description: process.env.SWAGGER_DESCRIPTION,
        version: process.env.SWAGGER_VERSION,
        path: process.env.SWAGGER_PATH,
      },
      postgres: {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
      },
      rabbitmq: {
        url: process.env.RABBITMQ_URL,
      },
    } as PartialDeep<GetEnv>;
  }

  return {
    node: {
      port: configService.get<number>('PORT'),
      nodeEnv: configService.get<Environment>('NODE_ENV'),
      appType: configService.get<AppType>('APP_TYPE'),
      appName: configService.get<string>('APP_NAME'),
    },
    swagger: {
      enabled: configService.get<boolean>('SWAGGER_ENABLED'),
      title: configService.get<string>('SWAGGER_TITLE'),
      description: configService.get<string>('SWAGGER_DESCRIPTION'),
      version: configService.get<string>('SWAGGER_VERSION'),
      path: configService.get<string>('SWAGGER_PATH'),
    },
    postgres: {
      host: configService.get<string>('POSTGRES_HOST'),
      port: configService.get<number>('POSTGRES_PORT'),
      user: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('POSTGRES_DATABASE'),
    },
    rabbitmq: {
      url: configService.get<string>('RABBITMQ_URL'),
    },
  };
}
