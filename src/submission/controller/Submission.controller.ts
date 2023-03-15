import { 
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,

 } from '@nestjs/common';
import { CreateSubmission, DeleteSubmission, FindTaskId, submitAgain } from '../../dto/CreateSubmission';
import { SubmissionsService } from '../service/Submission.service';

@Controller('api/submissions')
export class SubmissionsController {
    constructor( 
        private submissionService : SubmissionsService
    ){}





    @Get('/')
    allSubmission(){
        console.log(`GET All Submission}`)
        return this.submissionService.getAllSubmissions()
    }



    @Post('/createSubmission')
    createSubmission(
        @Body() createSubmissionDetile : CreateSubmission
    ){
        console.log(`POST has submission${createSubmissionDetile.displayName}`)
        return this.submissionService.createSubmission(createSubmissionDetile);
    }


    @Put('/SubmitSameTaskAnotherTime')
    submitSameTaskAnotherTime(
        @Body() submissionDetile : submitAgain
    ){
        return this.submissionService.SubmitSameTaskAnotherTime(submissionDetile)
    }



    @Delete()
    deleteSubmission(
        @Body() submissionDetile : DeleteSubmission
    ){
        return this.submissionService.deleteSubmission(submissionDetile)
    }


    @Get('/bytaskId')
    byTaskId(
        @Body() taskId : FindTaskId
    ){
        return this.submissionService.getTask(taskId)
    }

}
