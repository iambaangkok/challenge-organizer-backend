import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { User } from 'src/typeorm/entities/User';
import { ChallengesController } from './controller/challenges/challenges.controller';
import { ChallengesService } from './service/challenges.service';

@Module({
    imports: [TypeOrmModule.forFeature([Challenge, User])],
    controllers: [ChallengesController],
    providers: [ChallengesService],
})
export class ChallengesModule {}
