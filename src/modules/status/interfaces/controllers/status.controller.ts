// Core
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Application
import { StatusService } from '@/modules/status/application/services/status.service';
import { CreateStatusDto } from '@/modules/status/application/dto/create-status.dto';

@Controller('statuses')
export class StatusController {
  public constructor(private readonly statusService: StatusService) {}

  @MessagePattern('statuses.create')
  public create(@Payload() dto: CreateStatusDto): Promise<void> {
    return this.statusService.createStatus(dto);
  }
}
