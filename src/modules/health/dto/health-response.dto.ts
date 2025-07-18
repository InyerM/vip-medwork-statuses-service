import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    description: 'Status of the health check',
    example: 'ok',
  })
  public status: string;

  @ApiProperty({
    description: 'Uptime of the service',
    example: '12345',
  })
  public uptime: string;

  @ApiProperty({
    description: 'Timestamp of the health check',
    example: '2023-10-01T12:00:00Z',
  })
  public timestamp: string;

  @ApiProperty({
    description: 'Service name',
    example: 'MyService',
  })
  public service: string;

  @ApiProperty({
    description: 'Service host',
    example: 'localhost',
  })
  public host: string;
}
