// Enums
import type { AppType } from '../enums/app-type.enum';
import type { Environment } from '../enums/environment.enum';

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  path: string;
  version: string;
}

export interface NodeConfig {
  port: number;
  nodeEnv: Environment;
  appType: AppType;
  appName: string;
}

export interface RabbitmqConfig {
  url: string;
}

export interface PostgresConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export interface GetEnv {
  node: NodeConfig;
  swagger: SwaggerConfig;
  rabbitmq: RabbitmqConfig;
  postgres: PostgresConfig;
}
