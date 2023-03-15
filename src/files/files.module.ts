import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from '../typeorm/entities/Challenge';
import { File } from '../typeorm/entities/File';
import { Item } from '../typeorm/entities/Item';
import { Submission } from '../typeorm/entities/Submission';
import { Task } from '../typeorm/entities/Task';
import { User } from '../typeorm/entities/User';
import { FilesController } from './controller/files.controller';
import { FilesService } from './service/files.service';

@Module({
  imports : [TypeOrmModule.forFeature([File,User,Submission,Challenge,Item,Task]),
  MulterModule.register({
    dest : './files', // directory
  })
],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
 
