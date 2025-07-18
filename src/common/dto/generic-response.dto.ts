// Core
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

// Enums
import { ResponseStatus } from '../enums/response-status.enum';

export class GenericResponse<T> {
  @ApiProperty({
    enum: ResponseStatus,
    example: ResponseStatus.SUCCESS,
  })
  public status: ResponseStatus;

  @ApiPropertyOptional({
    enum: HttpStatus,
    example: HttpStatus.OK,
    description: 'HTTP status code',
  })
  public httpStatus?: HttpStatus;

  @ApiPropertyOptional({
    type: String,
    example: 'Success message',
  })
  public message?: string;

  public data: T | null;
}
