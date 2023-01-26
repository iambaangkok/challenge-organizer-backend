import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { ChallengesController } from './controller/challenges/challenges.controller';
import { ChallengesService } from './service/challenges.service';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  controllers: [ChallengesController],
  providers: [ChallengesService]
})
export class ChallengesModule {}
