// Core
import { Logger } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { z } from 'zod';

// Interfaces & Types
import type { PartialDeep } from 'type-fest';
import type { GetEnv } from '../interfaces/get-env.interface';

// Schemas
import { envSchema } from '../schemas/env.schema';

// Utils
import { getRawEnv } from './get-raw-env.util';

// Cache the environment config to avoid multiple initializations
let cachedEnv: GetEnv | undefined;

/**
 * Retrieves and validates the environment variables using the provided configuration service.
 * Caches the validated environment variables for subsequent calls.
 *
 * @param configService - An optional instance of `ConfigService` to retrieve raw environment variables.
 * @returns The validated and parsed environment variables of type `GetEnv`.
 * @throws Will throw an error if the environment variables fail validation.
 *         If the error is a `ZodError`, it will log and throw a detailed validation error message.
 */
export function getEnv(configService?: ConfigService): GetEnv {
  if (cachedEnv) return cachedEnv;

  // Retrieve all environment variables before validation (improves performance)
  const rawEnv: PartialDeep<GetEnv> = getRawEnv(configService);

  try {
    // Validate and parse environment variables
    cachedEnv = envSchema.parse(rawEnv);
    Logger.log('Environment variables loaded successfully ✅', 'INIT');
    return cachedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors
        .map((err) => {
          return `❌ Error in "${err.path.join('.')}" → ${err.message}`;
        })
        .join('\n');

      Logger.error(`\n[ENV VALIDATION ERROR] ❌${formattedErrors}`);
      throw new Error(`[ENV VALIDATION FAILED] ❌${formattedErrors}`);
    }

    throw error;
  }
}
