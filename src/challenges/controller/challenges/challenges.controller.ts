import { Controller ,Get} from '@nestjs/common';

import { ChallengesService } from 'src/challenges/service/challenges.service';

@Controller('api/challenges')
export class ChallengesController {



constructor(private challengeService: ChallengesService){}

    @Get()
    getAllChallenges(){
        return this.challengeService.findeAllChallenges();
    }
}
