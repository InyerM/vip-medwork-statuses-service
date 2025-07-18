// Core
import type { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import type { OpenAPIObject } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

// Utils
import { getEnv } from '../utils/get-env.util';

export function configureSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);

  const { node, swagger } = getEnv(configService);

  if (!swagger.enabled) {
    Logger.log('Swagger UI is disabled');
    return;
  }

  const options = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .setVersion(swagger.version)
    .build();

  const documentFactory = (): OpenAPIObject => SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swagger.path, app, documentFactory);
  Logger.log(`Swagger UI is running on http://localhost:${node.port}/${swagger.path}`);
}
