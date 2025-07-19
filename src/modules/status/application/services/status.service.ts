// Core
import { Injectable } from '@nestjs/common';

// Application
import { CreateStatusDto } from '../dto/create-status.dto';
import { CreateStatusUseCase } from '../use-cases/create-status.use-case';
import { FindByIdUseCase } from '../use-cases/find-by-id.use-case';
import { FindByIdsUseCase } from '../use-cases/find-by-ids.use-case';

// Domain
import { Status } from '@/modules/status/domain/models/status.model';

@Injectable()
export class StatusService {
  public constructor(
    private readonly createStatusUseCase: CreateStatusUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly findByIdsUseCase: FindByIdsUseCase,
  ) {}

  public createStatus(dto: CreateStatusDto): Promise<void> {
    return this.createStatusUseCase.execute(dto);
  }

  public findById(id: string): Promise<Status | null> {
    return this.findByIdUseCase.execute(id);
  }

  public findByIds(ids: string[]): Promise<Status[]> {
    return this.findByIdsUseCase.execute(ids);
  }
}
