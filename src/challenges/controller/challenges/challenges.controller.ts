import { Body, Controller ,Get, Param, Post} from '@nestjs/common';
import { ChallengesService } from 'src/challenges/service/challenges.service';
import { CreateChallenge } from 'src/dto/CreateChalleng.dto';
import { CreateChallengeParams } from 'src/challenges/utils/type';

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

    @Post()
    creatChallenges(@Body() challengeDetails: CreateChallenge){
        return this.challengeService.createChallenge(challengeDetails);
    }
}
