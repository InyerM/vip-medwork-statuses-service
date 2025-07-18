// Core
import z from 'zod';

// Enums
import { Environment } from '../enums/environment.enum';
import { AppType } from '../enums/app-type.enum';

export const envSchema = z.object({
  node: z.object({
    port: z.coerce.number().nonnegative().default(3000),
    nodeEnv: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),
    appType: z.nativeEnum(AppType).default(AppType.HTTP),
    appName: z.string().default('ms-statuses'),
  }),
  swagger: z.object({
    enabled: z.coerce.boolean().default(true),
    title: z.string().default('API Docs'),
    description: z.string().default('API documentation'),
    path: z.string().default('docs'),
    version: z.string().default('1.0'),
  }),
  rabbitmq: z.object({
    url: z.string().default('amqp://localhost:5672'),
  }),
  postgres: z.object({
    host: z.string().default('localhost'),
    port: z.coerce.number().default(5432),
    user: z.string().default('postgres'),
    password: z.string().default('postgres'),
    database: z.string().default('postgres'),
  }),
});
