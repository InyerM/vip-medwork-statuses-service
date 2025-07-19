import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '@/modules/status/domain/models/status.model';
import { StatusEntity } from '@/modules/status/infrastructure/entities/status.entity';
import { StatusMapper } from '@/modules/status/infrastructure/mappers/status.mapper';
import { StatusRepository } from '@/modules/status/domain/repositories/status.repository';

@Injectable()
export class StatusRepositoryImpl implements StatusRepository {
  public constructor(
    @InjectRepository(StatusEntity)
    private readonly repository: Repository<StatusEntity>,
  ) {}

  public async create(status: Status): Promise<void> {
    const entity = this.repository.create(StatusMapper.toPersistence(status));
    await this.repository.save(entity);
  }

  public async findChildren(parentId: string): Promise<Status[]> {
    const entities = await this.repository.find({ where: { parentId } });
    return entities.map((entity) => StatusMapper.toDomain(entity));
  }

  public async findById(id: string): Promise<Status | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? StatusMapper.toDomain(entity) : null;
  }

  public async findAll(): Promise<Status[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => StatusMapper.toDomain(entity));
  }

  public async findByName(name: string): Promise<Status | null> {
    const entity = await this.repository.findOneBy({ name });
    return entity ? StatusMapper.toDomain(entity) : null;
  }
}
