import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../typeorm/entities/File';
import { ParticiPantsGiveScore } from '../typeorm/entities/ParticiPantsGiveScore';
import { Post } from '../typeorm/entities/Post';
import { Rating } from '../typeorm/entities/Rating';
import { Tab } from '../typeorm/entities/Tab';
import { Task } from '../typeorm/entities/Task';
import { Challenge } from '../typeorm/entities/Challenge';
import { User } from '../typeorm/entities/User';
import { ChallengesController } from './controller/challenges.controller';
import { ChallengesService } from './service/challenges.service';

@Module({
    imports: [TypeOrmModule.forFeature([Challenge,User,Task,ParticiPantsGiveScore,Tab,Post,File,Rating])],
    controllers: [ChallengesController],
    providers: [ChallengesService],
})
export class ChallengesModule {}
