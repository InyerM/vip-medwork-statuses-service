// Core
import { ConflictException, NotFoundException, Inject, Injectable } from '@nestjs/common';

// Domain
import { StatusRepository } from '../../domain/repositories/status.repository';
import { STATUS_INJECTION_TOKEN } from '../../domain/constants/statuses-injection-token.constant';

// Infrastructure
import { CreateStatusDto } from '../dto/create-status.dto';

@Injectable()
export class CreateStatusUseCase {
  public constructor(
    @Inject(STATUS_INJECTION_TOKEN) private readonly statusRepository: StatusRepository,
  ) {}

  public async execute(input: CreateStatusDto): Promise<void> {
    const existing = await this.statusRepository.findByName(input.name);
    if (existing) {
      throw new ConflictException(`Status with name '${input.name}' already exists`);
    }

    if (input.parentId) {
      const parent = await this.statusRepository.findById(input.parentId);
      if (!parent) {
        throw new NotFoundException(`Parent status with id '${input.parentId}' not found`);
      }
    }

    await this.statusRepository.create({
      name: input.name,
      parentId: input.parentId,
      order: input.order,
      createdAt: new Date(),
    });
  }
}
