// Core
import { Module } from '@nestjs/common';

// Controllers
import { HealthController } from './controllers/health.controller';

// Services
import { HealthService } from './services/health.service';

@Module({
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
