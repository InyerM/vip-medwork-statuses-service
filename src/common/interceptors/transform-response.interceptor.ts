// Core
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Reflector } from '@nestjs/core';

// Enums
import { ResponseStatus } from '../enums/response-status.enum';

// Decorators
import { SKIP_TRANSFORM_KEY } from '../decorators/skip-transform.decorator';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  public constructor(private readonly reflector: Reflector) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const shouldSkip = this.reflector.get<boolean>(SKIP_TRANSFORM_KEY, context.getHandler());

    if (shouldSkip) return next.handle();

    return next.handle().pipe(
      map((response) => {
        if (!response || typeof response !== 'object' || Array.isArray(response)) {
          return {
            status: ResponseStatus.SUCCESS,
            timestamp: new Date().toISOString(),
            data: response,
          };
        }

        const { _message, data, ...rest } = response;
        const resultData = data ?? rest;

        return {
          status: ResponseStatus.SUCCESS,
          timestamp: new Date().toISOString(),
          message: _message,
          data: resultData,
        };
      }),
    );
  }
}
