import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { Post } from 'src/typeorm/entities/Post';
import { Tab } from 'src/typeorm/entities/Tab';
import { TabsController } from './controller/tabs.controller';
import { TabsService } from './service/tabs.service';

@Module({
  imports:[TypeOrmModule.forFeature([Tab,Post,Challenge])],
  controllers: [TabsController],
  providers: [TabsService]
})
export class TabsModule {}
