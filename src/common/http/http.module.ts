// Core
import { Module } from '@nestjs/common';
import { HttpModule as NestHttpModule } from '@nestjs/axios';

// Adapter
import { HTTP_ADAPTER, HttpAdapter } from './adapter/http.adapter';

@Module({
  imports: [NestHttpModule],
  providers: [{ provide: HTTP_ADAPTER, useClass: HttpAdapter }],
  exports: [HTTP_ADAPTER],
})
export class HttpModule {}
