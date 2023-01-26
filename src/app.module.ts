import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';
import { Challenge } from './typeorm/entities/Challenge';
import { PostsModule } from './posts/posts.module';
import { ShopsModule } from './shops/shops.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "useUnifiedTopology": true,
    "type": "mongodb",
    "url": "mongodb+srv://Geba001:areyougeba@challengeorganizer.kndy1kv.mongodb.net/test",//กลับมาถามหรัสด้วย
    "useNewUrlParser": true,
    "synchronize": true,
    "logging": true,
    "port" : 3000,
    "host" : "localhost",
    // "entities": ["src/entity/*.*"]
    "entities" :[User,Challenge] ,
    "migrationsTableName": "",
  }), ChallengesModule,UsersModule, PostsModule, ShopsModule],//PostsModule
  // mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
  
  controllers: [],
  providers: [],
})
export class AppModule { }
