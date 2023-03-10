import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { Post } from 'src/typeorm/entities/Post';
import { Tab } from 'src/typeorm/entities/Tab';
import { User } from 'src/typeorm/entities/User';
import { PostsController } from './controller/posts/posts.controller';
import { PostsService } from './services/posts/posts.service';


@Module({
  imports:[TypeOrmModule.forFeature([Challenge,Post,User,Tab])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
