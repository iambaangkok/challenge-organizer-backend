import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from '../typeorm/entities/Challenge';
import { Post } from '../typeorm/entities/Post';
import { Tab } from '../typeorm/entities/Tab';
import { User } from '../typeorm/entities/User';
import { PostsController } from './controller/posts.controller';
import { PostsService } from './services/posts.service';


@Module({
  imports:[TypeOrmModule.forFeature([Challenge,Post,User,Tab])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
