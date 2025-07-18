// Core
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { BaseRpcContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// Enums
import { ResponseStatus } from '../enums/response-status.enum';

// DTO
import { GenericResponse } from '../dto/generic-response.dto';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  public catch(
    exception: unknown,
    host: ArgumentsHost,
  ): Observable<GenericResponse<null>> | undefined {
    if (host.getType() !== 'rpc') return;

    let message = 'Internal server error';
    let stack = '';
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    const ctx = host.switchToRpc().getContext<BaseRpcContext>();

    if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack ?? '';
    }

    if (this.isHttpException(exception)) {
      const response = exception.getResponse();
      httpStatus = exception.getStatus();
      message = `[${HttpStatus[httpStatus]}] - ${typeof response === 'string' ? response : JSON.stringify(response)}`;
      stack = exception.stack ?? '';
    }

    Logger.error(
      `❌ [RPC]\n\tErrorMessage: ${message}\n\tStack: ${stack}\n\tArguments: ${JSON.stringify(ctx.getArgs())}`,
      RpcExceptionFilter.name,
    );

    const response: GenericResponse<null> = {
      status: ResponseStatus.ERROR,
      message,
      data: null,
      httpStatus,
    };

    return new Observable((subscriber) => {
      subscriber.next(response);
      subscriber.complete();
    });
  }

  private isHttpException(
    exception: unknown,
  ): exception is { getResponse: () => string | object; getStatus: () => number; stack?: string } {
    return typeof exception === 'object' && exception !== null && 'getResponse' in exception;
  }
}
