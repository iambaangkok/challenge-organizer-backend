import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ChallengesService } from '../service/challenges.service';
import { CreateChallenge } from '../../dto/CreateChallenge.dto';
// import { CreateChallengeParams } from 'src/challenges/utils/type';
import { EditChallengeDto } from '../../dto/EditChallenge.dto';
import { JoinLeaveChallengeDto } from '../../dto/JoinLeaveChallenge.dto';

@Controller('api/challenges')
export class ChallengesController {
    constructor(private challengeService: ChallengesService) {}

    @Get('/')
    getAllChallenges() {
        console.log(`GET /`);
        return this.challengeService.findAllChallenges();
    }

    @Get('/byUserDisplayname/:displayName')
    getAllChallengesByDisplayName(@Param('displayName') displayName: string) {
        console.log(`GET /${displayName}`);
        return this.challengeService.findeAllChallengesByDisplayName(
            displayName,
        );
    }

    @Get('/:challengeTitle')
    getChallenges(@Param('challengeTitle') challengeTitle: string) {
        console.log(`GET /${challengeTitle}`);
        return this.challengeService.findChallenges(challengeTitle);
    }

    @Post()
    creatChallenges(@Body() challengeDetails: CreateChallenge) {
        console.log(`/`);
        return this.challengeService.createChallenge(challengeDetails);
    }

    @Put('/:challengeTitle')
    editChallenges(
        @Param('challengeTitle') challengeTitle: string,
        @Body() editChallengeDto: EditChallengeDto,
    ) {
        console.log(`PUT /${challengeTitle}`);
        return this.challengeService.editChallenge(
            challengeTitle,
            editChallengeDto,
        );
    }

    @Delete('/:challengeTitle')
    deleteChallenges(@Param('challengeTitle') challengeTitle: string) {
        console.log(`DELETE /${challengeTitle}`);
        return this.challengeService.deleteChallenge(challengeTitle);
    }

    @Put('/:challengeTitle/join')
    joinChallenges(
        @Param('challengeTitle') challengeTitle: string,
        @Body() joinChallengeDto: JoinLeaveChallengeDto,
    ) {
        console.log(`PUT /${challengeTitle}/join`);
        return this.challengeService.joinChallenge(
            challengeTitle,
            joinChallengeDto,
        );
    }

    @Put('/:challengeTitle/leave')
    leaveChallenges(
        @Param('challengeTitle') challengeTitle: string,
        @Body() leaveChallengeDto: JoinLeaveChallengeDto,
    ) {
        console.log(`PUT /${challengeTitle}/leave`);
        return this.challengeService.leaveChallenge(
            challengeTitle,
            leaveChallengeDto,
        );
    }
}
