// Core
import type { INestApplication, INestMicroservice } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

// Utils
import { configureSwagger } from './configure-swagger';

/**
 * Configures the provided NestJS application instance with common settings.
 *
 * This function performs the following configurations:
 * - Enables Cross-Origin Resource Sharing (CORS) for the application.
 * - Sets a global prefix for all routes to `api`.
 * - Configures Swagger for API documentation.
 * - Sets up a global validation pipe with the following options:
 *   - `whitelist`: Strips properties that do not have decorators.
 *   - `forbidNonWhitelisted`: Throws an error if non-whitelisted properties are present.
 *   - `transform`: Automatically transforms payloads to match the expected DTO types.
 *
 * @param app - The NestJS application instance to configure.
 * @returns The configured NestJS application instance.
 */
export function configureApp(app: INestApplication): INestApplication {
  app.enableCors();
  app.setGlobalPrefix('api');
  configureSwagger(app);

  // Configure global pipe for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  return app;
}

/**
 * Configures the given NestJS microservice application with global settings.
 *
 * This function sets up a global validation pipe for the application to ensure
 * that incoming requests are validated according to the defined DTOs. The validation
 * pipe has the following options:
 * - `whitelist`: Strips any properties that are not explicitly defined in the DTO.
 * - `forbidNonWhitelisted`: Throws an error if any non-whitelisted properties are present.
 * - `transform`: Automatically transforms payloads to match the expected DTO types.
 *
 * @param app - The NestJS microservice application instance to configure.
 */
export function configureAppWithRabbitMQ(app: INestMicroservice): void {
  // Configure global pipe for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
