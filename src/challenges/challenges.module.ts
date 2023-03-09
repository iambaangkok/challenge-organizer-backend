import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/typeorm/entities/File';
import { ParticiPantsGiveScore } from 'src/typeorm/entities/participantsGiveScore';
import { Post } from 'src/typeorm/entities/Post';
import { Rating } from 'src/typeorm/entities/Rating';
import { Tab } from 'src/typeorm/entities/Tab';
import { Task } from 'src/typeorm/entities/Task';
import { TaskTemplate } from 'src/typeorm/entities/TaskTemplate';
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
