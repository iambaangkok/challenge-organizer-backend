import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mongodb",
    "url": "mongodb+srv://Geba001:********@challengeorganizer.kndy1kv.mongodb.net/test",//กลับมาถามหรัสด้วย
    "useNewUrlParser": true,
    "synchronize": true,
    "logging": true,
    "port" : 3000,
    "host" : "localhost",
    // "entities": ["src/entity/*.*"]
    "entities" :[] 
  }), ChallengesModule,UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
