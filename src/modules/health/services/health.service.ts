// Core
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hostname } from 'os';

// Utils
import { getEnv } from '@/common/utils/get-env.util';

// DTOs
import { HealthResponseDto } from '../dto/health-response.dto';
import { ResponseStatus } from '@/common/enums/response-status.enum';

@Injectable()
export class HealthService {
  public constructor(private readonly configService: ConfigService) {}

  private readonly startTime = Date.now();

  public check(): HealthResponseDto {
    const now = Date.now();
    const uptimeInSeconds = Math.floor((now - this.startTime) / 1000);
    const { node } = getEnv(this.configService);
    return {
      status: ResponseStatus.OK,
      uptime: `${uptimeInSeconds}s`,
      timestamp: new Date().toISOString(),
      service: node.appName,
      host: hostname(),
    };
  }
}
