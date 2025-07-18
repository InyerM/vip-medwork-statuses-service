// Core
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const contextType = context.getType();
    const startTime = Date.now();

    switch (contextType) {
      case 'http':
        return this.handleHttp(context, next, startTime);
      case 'rpc':
        return this.handleRpc(context, next, startTime);
      default:
        return next.handle();
    }
  }

  private handleHttp(
    context: ExecutionContext,
    next: CallHandler,
    startTime: number,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, headers } = request;

    Logger.debug(
      `⚡️ [HTTP ${method}] ${headers['user-agent']} ${url} - Request...`,
      LoggingInterceptor.name,
    );

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        Logger.debug(
          `✅ [HTTP ${method}] ${headers['user-agent']} ${url} - Response (${duration}ms)`,
          LoggingInterceptor.name,
        );
      }),
    );
  }

  private handleRpc(
    context: ExecutionContext,
    next: CallHandler,
    startTime: number,
  ): Observable<unknown> {
    const data = context.switchToRpc().getData();
    const pattern = context.getHandler().name || 'unknown';

    Logger.debug(
      `📡 [RPC] Pattern: ${pattern} - Data: ${JSON.stringify(data)}`,
      LoggingInterceptor.name,
    );

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        Logger.debug(
          `✅ [RPC] Pattern: ${pattern} - Response in ${duration}ms`,
          LoggingInterceptor.name,
        );
      }),
    );
  }
}
