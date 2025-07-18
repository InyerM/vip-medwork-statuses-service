// Core
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import type { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';

// App
import { AppModule } from '@/app/app.module';

// Utils
import { configureAppWithRabbitMQ } from './configure-app';

// Interfaces & Types
import type { RabbitmqConfig } from '../interfaces/get-env.interface';

/**
 * Bootstraps a RabbitMQ microservice using the provided options and environment configuration.
 *
 * @param rabbitmqOptions - Configuration options for the RabbitMQ microservice.
 * @param rabbitmqEnv - Environment configuration for the RabbitMQ server, including url.
 * @returns A promise that resolves when the microservice is successfully started.
 *
 * @remarks
 * This function initializes a NestJS microservice with RabbitMQ transport, applies
 * necessary configurations, and starts listening for incoming messages. Once the
 * microservice is running, a log message is displayed with the connection details.
 */
export async function bootstrapRabbitmq(
  rabbitmqOptions: NestMicroserviceOptions,
  rabbitmqEnv: RabbitmqConfig,
): Promise<void> {
  const microservice = await NestFactory.createMicroservice(AppModule, rabbitmqOptions);
  configureAppWithRabbitMQ(microservice);
  await microservice.listen().then(() => {
    Logger.log(
      `RabbitMQ microservice is running 🚀 on amqp://${rabbitmqEnv.url}`,
      bootstrapRabbitmq.name,
    );
  });
}
