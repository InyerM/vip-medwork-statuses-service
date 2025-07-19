// Core
import { Module } from '@nestjs/common';
import { RouterModule as NRouterModule } from '@nestjs/core';

// Modules
import { HealthModule } from '@/modules/health/health.module';
import { StatusModule } from '@/modules/status/status.module';

@Module({
  imports: [
    HealthModule,
    StatusModule,
    NRouterModule.register([
      {
        path: '/health',
        module: HealthModule,
      },
      {
        path: '/status',
        module: StatusModule,
      },
    ]),
  ],
})
export class RouterModule {}
