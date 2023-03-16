import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    UseInterceptors,
    UploadedFile,
    Param,
} from '@nestjs/common';
import {
    CreateSubmission,
    DeleteSubmission,
    FindTaskId,
    submitAgain,
} from '../../dto/CreateSubmission';
import { SubmissionsService } from '../service/Submission.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('api/submissions')
export class SubmissionsController {
    constructor(private submissionService: SubmissionsService) {}

    @Get('/')
    allSubmission() {
        console.log(`GET All Submission}`);
        return this.submissionService.getAllSubmissions();
    }

    @Post('/createSubmission')
    createSubmission(@Body() createSubmissionDetile: CreateSubmission) {
        console.log(`POST has submission${createSubmissionDetile.displayName}`);
        return this.submissionService.createSubmission(createSubmissionDetile);
    }

    @Put('/SubmitSameTaskAnotherTime')
    submitSameTaskAnotherTime(@Body() submissionDetile: submitAgain) {
        return this.submissionService.SubmitSameTaskAnotherTime(
            submissionDetile,
        );
    }

    @Delete()
    deleteSubmission(@Body() submissionDetile: DeleteSubmission) {
        return this.submissionService.deleteSubmission(submissionDetile);
    }

    @Get('/bytaskId')
    byTaskId(@Body() taskId: FindTaskId) {
        return this.submissionService.getTask(taskId);
    }

    // temp uploadfile to submission
    @Post('/:submissionId/uploadfile')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './client/uploads/files',
                filename: (req, file, cb) => {
                    const suffix =
                        Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    cb(null, `${suffix}${ext}`);
                },
            }),
        }),
    )
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('submissionId') submissionId: number,
    ) {
        console.log('file', file);
        this.submissionService.setPath(file.path, submissionId);
        return file.path;
    }
}
