import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from '../typeorm/entities/Challenge';
import { Task } from '../typeorm/entities/Task';
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';

@Module({
    imports: [TypeOrmModule.forFeature([Challenge, Task])],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
