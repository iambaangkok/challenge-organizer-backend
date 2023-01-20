import { Module } from '@nestjs/common';
import { ChallengesController } from './controller/challenges/challenges.controller';
import { ServiceService } from './service/service.service';

@Module({
  controllers: [ChallengesController],
  providers: [ServiceService]
})
export class ChallengesModule {}
