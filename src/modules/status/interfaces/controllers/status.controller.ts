// Core
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Application
import { StatusService } from '@/modules/status/application/services/status.service';
import { CreateStatusDto } from '@/modules/status/application/dto/create-status.dto';

// Domain
import { Status } from '@/modules/status/domain/models/status.model';

@Controller('statuses')
export class StatusController {
  public constructor(private readonly statusService: StatusService) {}

  @MessagePattern('statuses.create')
  public create(@Payload() dto: CreateStatusDto): Promise<void> {
    return this.statusService.createStatus(dto);
  }

  @MessagePattern('statuses.findById')
  public findById(@Payload() id: string): Promise<Status | null> {
    return this.statusService.findById(id);
  }

  @MessagePattern('statuses.findByIds')
  public findByIds(@Payload() ids: string[]): Promise<Status[]> {
    return this.statusService.findByIds(ids);
  }

  @MessagePattern('statuses.findAll')
  public findAll(): Promise<Status[]> {
    return this.statusService.findAll();
  }
}
