import { Body, Controller ,Get, Post} from '@nestjs/common';
import { ChallengesService } from 'src/challenges/service/challenges.service';
// import { CreateChallenge } from 'src/dto/CreateChallenge.dto';
import { CreateChallengeParams } from 'src/challenges/utils/type';

@Controller('api/challenges')
export class ChallengesController {

constructor(private challengeService: ChallengesService){}

    @Get()
    getAllChallenges(){
        return this.challengeService.findeAllChallenges();
    }

    @Post()
    creatChallenges(@Body() challengeDetails: CreateChallengeParams){
        return this.challengeService.createChallenge(challengeDetails);
    }
}
