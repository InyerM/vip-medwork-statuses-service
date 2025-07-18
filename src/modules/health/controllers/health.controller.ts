// Core
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';

// Services
import { HealthService } from '../services/health.service';

// DTOs
import { HealthResponseDto } from '../dto/health-response.dto';

// Decorators
import { SkipTransform } from '@/common/decorators/skip-transform.decorator';

@Controller()
@ApiTags('Health')
export class HealthController {
  public constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check the health of the service' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK', type: HealthResponseDto })
  @HttpCode(HttpStatus.OK)
  @SkipTransform()
  @MessagePattern(`health.check`)
  public check(): Promise<HealthResponseDto> {
    return Promise.resolve(this.healthService.check());
  }
}
