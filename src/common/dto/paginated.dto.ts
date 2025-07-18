// Core
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max, IsString, IsNotEmpty, IsIn, IsNumber } from 'class-validator';

export class PaginatedDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(500)
  @ApiProperty({
    description: 'Number of items to return',
    required: false,
    example: 10,
    default: 10,
  })
  public take: number = 10;

  @IsOptional()
  @Type(() => Number)
  @Max(999999999999999)
  @Min(1)
  @IsInt()
  @ApiProperty({
    description: 'Page number to return',
    required: false,
    example: 1,
    default: 1,
  })
  public page: number = 1;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Field to order by',
    required: false,
    example: 'id',
  })
  public sortBy?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @IsIn([1, -1])
  @ApiProperty({
    description: 'Order of the results',
    required: false,
    example: 1,
    enum: [1, -1],
  })
  public sortDirection: 1 | -1 = 1;
}
