// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

// Interceptors
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TransformResponseInterceptor } from '@/common/interceptors/transform-response.interceptor';

// Filters
import { RpcExceptionFilter } from '@/common/filters/rpc-exception.filter';

// Modules
import { RouterModule } from './../router/router.module';
import { TypeormModule } from '@/modules/typeorm/typeorm.module';

@Module({
  imports: [
    RouterModule,
    TypeormModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: RpcExceptionFilter,
    },
  ],
})
export class AppModule {}
