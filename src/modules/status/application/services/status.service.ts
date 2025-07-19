// Core
import { Injectable } from '@nestjs/common';

// Application
import { CreateStatusDto } from '../dto/create-status.dto';
import { CreateStatusUseCase } from '../use-cases/create-status.use-case';

@Injectable()
export class StatusService {
  public constructor(private readonly createStatusUseCase: CreateStatusUseCase) {}

  public createStatus(dto: CreateStatusDto): Promise<void> {
    return this.createStatusUseCase.execute(dto);
  }
}
