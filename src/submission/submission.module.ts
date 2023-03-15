import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { ServiceService } from './service/service.service';

@Module({
  controllers: [ControllerController],
  providers: [ServiceService]
})
export class SubmissionModule {}
