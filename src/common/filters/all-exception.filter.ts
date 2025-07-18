// Core
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Dto
import { GenericResponse } from '../dto/generic-response.dto';

// Enums
import { ResponseStatus } from '../enums/response-status.enum';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost): void {
    if (host.getType() !== 'http') return undefined;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'InternalServerError';

    statusCode = exception instanceof HttpException ? exception.getStatus() : statusCode;
    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : null;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object') {
      const { message: responseMessage, error: responseError } = exceptionResponse as {
        message?: string;
        error?: string;
      };
      message = responseMessage ?? message;
      error = responseError ?? error;
    }

    Logger.error(
      `❌ [${request.method}] ${request.url} \n\tUserAgent: ${request.headers['user-agent']} \n\tError: ${error} \n\tStatusCode: ${statusCode} \n\tErrorMessage: ${message}`,
      AllExceptionFilter.name,
    );

    const responseBody: GenericResponse<null> = {
      status: ResponseStatus.ERROR,
      message,
      data: null,
    };

    response.status(statusCode).json(responseBody);
  }
}
