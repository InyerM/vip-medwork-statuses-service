// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Infrastructure
import { StatusEntity } from './infrastructure/entities/status.entity';
import { StatusRepositoryImpl } from './infrastructure/repositories/status.repository.impl';

// Application
import { CreateStatusUseCase } from './application/use-cases/create-status.use-case';
import { StatusService } from './application/services/status.service';

// Interfaces
import { StatusController } from './interfaces/controllers/status.controller';

// Domain
import { STATUS_INJECTION_TOKEN } from './domain/constants/statuses-injection-token.constant';

@Module({
  imports: [TypeOrmModule.forFeature([StatusEntity])],
  controllers: [StatusController],
  providers: [
    StatusRepositoryImpl,
    CreateStatusUseCase,
    StatusService,
    {
      provide: STATUS_INJECTION_TOKEN,
      useExisting: StatusRepositoryImpl,
    },
  ],
})
export class StatusModule {}
