import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseInterceptors,
    UploadedFile 


} from '@nestjs/common';
import { ChallengesService } from '../service/challenges.service';
import { CreateChallenge } from '../../dto/CreateChallenge.dto';
// import { CreateChallengeParams } from 'src/challenges/utils/type';
import { EditChallengeDto } from '../../dto/EditChallenge.dto';
import { JoinLeaveChallengeDto } from '../../dto/JoinLeaveChallenge.dto';
import { AddCollaboratorDto, findChallengeTask } from '../../dto/AddCollaborator';
import { DeleteCollaborator } from '../../dto/DeleteCollaborator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('api/challenges')
export class ChallengesController {
    constructor(private challengeService: ChallengesService) {}

    @Get('/')
    getAllChallenges() {
        console.log(`GET /`);
        return this.challengeService.findAllChallenges();
    }

    @Get('/by-user-display-name/:displayName')
    getAllChallengesByDisplayName(@Param('displayName') displayName: string) {
        console.log(`GET /by-user-display-name/${displayName}`);
        return this.challengeService.findAllChallengesByDisplayName(
            displayName,
        );
    }

    @Get('/allTask')
    getAllTask(@Body() challengeTitle : findChallengeTask){
        console.log(`GET /allTask by challengeTitle/${challengeTitle.challengeTitle}`);
        return this.challengeService.allTask(challengeTitle)
    }

    @Put('/addCollaborators')
    addCollaborator(@Body() addCollaborator: AddCollaboratorDto) {
        console.log(`PUT /${addCollaborator.challengeTitle}`);
        return this.challengeService.addCollaborators(addCollaborator);
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

    @Delete('/deleteCollaborators')
    deleteCollaborator(
        @Body() deleteCollaboratorDto: DeleteCollaborator
    ) {
        console.log(`DELETE /${deleteCollaboratorDto.displayName}/delete`);
        return this.challengeService.deleteCollaborators(deleteCollaboratorDto)
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

    // @Delete('/deleteCollaborators')
    // deleteCollaborator(
    //     @Body() deleteCollaboratorDto: DeleteCollaborator
    // ){
    //     console.log(`DELETE /${deleteCollaboratorDto.userId}/delete`);
    //     return this.challengeService.deleteCollaborators(deleteCollaboratorDto)
    // }

    // @Post("/file")
    // @UseInterceptors(FileInterceptor('file', {
    //     storage: diskStorage({
    //         destination: './uploads/files',
    //         filename: (req, file, cb) => {
    //             const randomName = Array(32).fill(null).map(() =>
    //                 (Math.round(Math.random() * 16)).toString(16)).join('');
    //             return cb(null, `${randomName}${extname(file.originalname)}`);
    //         },
    //     }),
    // }))
    // uploadFile(
    //     @UploadedFiles() file: Express.Multer.File
    // ) {
    //     console.log('file', file)
    //     return ("file upload")
    // }

    // @Post('file')
    // @UseInterceptors(FileInterceptor('file'))
    // async uploadFile(@UploadedFile() file : Express.Multer.File) {
    //     console.log(file);
    // }


}
