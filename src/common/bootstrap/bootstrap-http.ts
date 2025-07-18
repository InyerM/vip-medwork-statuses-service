// Core
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

// Config
import { configureApp } from './configure-app';

// App
import { AppModule } from '@/app/app.module';

// Interfaces
import type { NodeConfig } from '../interfaces/get-env.interface';

/**
 * Bootstraps the HTTP server for the application.
 *
 * This function initializes a NestJS application using the `AppModule`,
 * applies necessary configurations, and starts the HTTP server on the
 * specified port from the provided environment configuration.
 *
 * @param env - The environment configuration object containing the port
 *              on which the HTTP server should listen.
 * @returns A promise that resolves when the server is successfully started.
 */
export async function bootstrapHttp(env: NodeConfig): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  await app.listen(env.port, () => {
    Logger.log(`HTTP server is running on http://localhost:${env.port}`);
  });
}
