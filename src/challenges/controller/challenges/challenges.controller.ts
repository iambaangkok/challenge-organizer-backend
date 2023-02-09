import { Controller ,Get, Param, Post} from '@nestjs/common';
import { ChallengesService } from 'src/challenges/service/challenges.service';

@Controller('api/challenges')
export class ChallengesController {



constructor(private challengeService: ChallengesService){}

    @Get()
    getAllChallenges(){
        return this.challengeService.findeAllChallenges();
    }

    @Get(':title')
    getChallenges(@Param('title') title: string){
        return this.challengeService.findChallenges(title);
    }
}
