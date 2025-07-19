// Core
import { Transport } from '@nestjs/microservices';
import type { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';

// Interfaces & Types
import type { RabbitmqConfig } from '../interfaces/get-env.interface';

export function getRabbitmqOptions({ url }: RabbitmqConfig): NestMicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: 'statuses_queue',
      queueOptions: {
        durable: true,
      },
      noAck: true,
    },
  } as NestMicroserviceOptions;
}
