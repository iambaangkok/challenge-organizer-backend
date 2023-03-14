import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesService } from 'src/challenges/service/challenges.service';
import { Challenge } from '../typeorm/entities/Challenge';
import { Post } from '../typeorm/entities/Post';
import { Tab } from '../typeorm/entities/Tab';
import { TabsController } from './controller/tabs.controller';
import { TabsService } from './service/tabs.service';

@Module({
  imports:[TypeOrmModule.forFeature([Tab,Post,Challenge])],
  controllers: [TabsController],
  providers: [TabsService, ChallengesService]
})
export class TabsModule {}
