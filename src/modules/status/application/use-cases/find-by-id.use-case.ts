// Core
import { Inject, Injectable } from '@nestjs/common';

// Domain
import { StatusRepository } from '@/modules/status/domain/repositories/status.repository';
import { Status } from '@/modules/status/domain/models/status.model';
import { STATUS_INJECTION_TOKEN } from '@/modules/status/domain/constants/statuses-injection-token.constant';

@Injectable()
export class FindByIdUseCase {
  public constructor(
    @Inject(STATUS_INJECTION_TOKEN) private readonly statusRepository: StatusRepository,
  ) {}

  public async execute(id: string): Promise<Status | null> {
    return this.statusRepository.findById(id);
  }
}
