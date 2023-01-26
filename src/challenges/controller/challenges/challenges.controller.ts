import { Controller ,Get} from '@nestjs/common';

import { ChallengesService } from 'src/challenges/service/challenges.service';

@Controller('challenges')
export class ChallengesController {



constructor(private challengeService: ChallengesService){}


    @Get()
    getChallenges(){

        return this.challengeService.findeChallenges();
    }
    
}
