// Domain
import type { Status } from '@/modules/status/domain/models/status.model';

// Infrastructure
import { StatusEntity } from '@/modules/status/infrastructure/entities/status.entity';

export class StatusMapper {
  public static toDomain(entity: StatusEntity): Status {
    return {
      id: entity.id,
      name: entity.name,
      parentId: entity.parentId,
      order: entity.order,
      createdAt: entity.createdAt,
    };
  }

  public static toPersistence(domain: Partial<Status>): StatusEntity {
    return new StatusEntity(domain);
  }
}
