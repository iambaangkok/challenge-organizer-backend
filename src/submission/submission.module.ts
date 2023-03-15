import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from 'src/typeorm/entities/Submission';
import { Task } from 'src/typeorm/entities/Task';
import { User } from 'src/typeorm/entities/User';
import { SubmissionsController } from './controller/Submission.controller';
import { SubmissionsService } from './service/Submission.service';

@Module({
  imports : [TypeOrmModule.forFeature([User,Submission,Task])],
  controllers: [SubmissionsController],
  providers: [SubmissionsService]
})
export class SubmissionModule {}
