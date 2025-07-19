// src/infrastructure/persistence/typeorm/entities/status.orm-entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('statuses')
export class StatusEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid', description: 'Status ID' })
  public id: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ example: 'Scheduled', description: 'Status name' })
  public name: string;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  @ApiProperty({ example: 'uuid', description: 'Parent status ID' })
  public parentId: string | null;

  @Column({ type: 'int' })
  @ApiProperty({ example: 1, description: 'Order of the status' })
  public order: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Creation date' })
  public createdAt: Date;

  public constructor(params: Partial<StatusEntity>) {
    Object.assign(this, params);
  }
}
