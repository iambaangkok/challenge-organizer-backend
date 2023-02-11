import { Controller ,Get ,Post,Delete,Put,Body} from '@nestjs/common';

import { ChallengesService } from 'src/challenges/service/challenges.service';
import { CreateChallengeDto } from 'src/dto/CreateChalleng.dto';

@Controller('challenges')
export class ChallengesController {



constructor(private challengeService: ChallengesService){}


    @Get()
    getChallenges(){
        return this.challengeService.findeChallenges();
    }
    
    @Post()
    async createChallenge(@Body() createChallengeDetails : CreateChallengeDto ){
        return await this.challengeService.createChallenge(createChallengeDetails)
    }
        
}
