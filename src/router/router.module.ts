// Core
import { Module } from '@nestjs/common';
import { RouterModule as NRouterModule } from '@nestjs/core';

// Modules
import { HealthModule } from '@/modules/health/health.module';

@Module({
  imports: [
    HealthModule,
    NRouterModule.register([
      {
        path: '/health',
        module: HealthModule,
      },
    ]),
  ],
})
export class RouterModule {}
