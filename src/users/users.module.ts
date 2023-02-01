import { Module } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';
import { Post } from 'src/typeorm/entities/Post';

@Module({
  imports:[TypeOrmModule.forFeature([User,Post])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
