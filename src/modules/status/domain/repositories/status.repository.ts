import type { Status } from '../models/status.model';

export interface StatusRepository {
  findById(id: string): Promise<Status | null>;
  findByIds(ids: string[]): Promise<Status[]>;
  findAll(): Promise<Status[]>;
  findByName(name: string): Promise<Status | null>;
  findChildren(parentId: string): Promise<Status[]>;
  create(status: Partial<Status>): Promise<void>;
}
