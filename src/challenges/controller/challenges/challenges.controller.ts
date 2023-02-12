import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChallengesService } from 'src/challenges/service/challenges.service';
import { CreateChallenge } from 'src/dto/CreateChalleng.dto';
// import { CreateChallengeParams } from 'src/challenges/utils/type';
import { EditChallengeDto } from 'src/dto/EditChallenge.dto';
import { JoinLeaveChallengeDto } from 'src/dto/JoinLeaveChallenge.dto';

@Controller('api/challenges')
export class ChallengesController {

    constructor(private challengeService: ChallengesService) { }

    @Get()
    getAllChallenges(){
        return this.challengeService.findAllChallenges();
    }

    @Get(':displayName')
    getAllChallengesByDisplayName(@Param('displayName') displayName: string) {
        return this.challengeService.findeAllChallengesByDisplayName(displayName);
    }


    @Get(':title')
    getChallenges(@Param('title') title: string) {
        return this.challengeService.findChallenges(title);
    }

    @Post()
    creatChallenges(@Body() challengeDetails: CreateChallenge) {
        return this.challengeService.createChallenge(challengeDetails);
    }

    @Put(':challengeTitle')
    editChallenges(@Param('challengeTitle') challengeTitle: string, @Body() editChallengeDto: EditChallengeDto) {
        return this.challengeService.editChallenge(challengeTitle, editChallengeDto);
    }

    @Delete(':title')
    deleteChallenges(@Param('title') title: string) {
        return this.challengeService.deleteChallenge(title);
    }

    @Put('/join/:title')
    joinChallenges(@Param('title') title: string, @Body() joinChallengeDto: JoinLeaveChallengeDto) {
        return this.challengeService.joinChallenge(title, joinChallengeDto);
    }

    @Put('/leave/:title')
    leaveChallenges(@Param('title') title: string, @Body() leaveChallengeDto: JoinLeaveChallengeDto) {
        return this.challengeService.leaveChallenge(title, leaveChallengeDto);
    }


}
