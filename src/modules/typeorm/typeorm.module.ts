// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Utils
import { getEnv } from '@/common/utils/get-env.util';

// Entities
import { StatusEntity } from '../status/infrastructure/entities/status.entity';

const env = getEnv();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.postgres.host,
      port: env.postgres.port,
      username: env.postgres.user,
      password: env.postgres.password,
      database: env.postgres.database,
      synchronize: true,
      entities: [StatusEntity],
      logging: true,
    }),
  ],
})
export class TypeormModule {}
