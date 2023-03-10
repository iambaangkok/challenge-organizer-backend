import { Module } from '@nestjs/common';
import { TaskController } from './controller/task/task.controller';
import { TaskService } from './service/task/task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
