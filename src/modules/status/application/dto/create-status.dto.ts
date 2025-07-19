import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'In Consultation' })
  @IsString()
  public name: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsOptional()
  @IsUUID()
  public parentId?: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(0)
  public order: number;
}
