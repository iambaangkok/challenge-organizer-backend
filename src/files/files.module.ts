import { Module } from '@nestjs/common';
import { FilesController } from './controller/files.controller';
import { FilesService } from './service/files.service';

@Module({
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
