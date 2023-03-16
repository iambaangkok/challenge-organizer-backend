import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from '../../typeorm/entities/Submission';
import { Task } from '../../typeorm/entities/Task';
import { User } from '../../typeorm/entities/User';
import { Repository } from 'typeorm';
import {
    createSubmissionDto,
    deleteSubmissionParam,
    submitAgain,
    TaskIdParam,
    updateGradeDto,
} from '../utils/type';

@Injectable()
export class SubmissionsService {
    constructor(
        @InjectRepository(Submission)
        private submissionRepository: Repository<Submission>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAllSubmissions() {
        return await this.submissionRepository.find();
    }

    async findSubmission(submissionId: number) {
        const submission = this.submissionRepository.findOne({
            where: { submissionId: submissionId },
        });
        return submission;
    }

    async createSubmission(createSubmission: createSubmissionDto) {
        const task = await this.taskRepository.findOne({
            where: {
                taskId: createSubmission.taskId,
            },
        });

        const user = await this.userRepository.findOne({
            where: {
                displayName: createSubmission.displayName,
            },
        });

        if (!user) {
            throw new HttpException('Nor Found user', HttpStatus.BAD_REQUEST);
        }   
        if (!task) {
            throw new HttpException(
                'Not Found this task',
                HttpStatus.BAD_REQUEST,
            );
        } else {
            const submission = await this.submissionRepository.create({
                createDate: new Date(),
                task : task ,
                hasSubmit: user,
            });
            return await this.submissionRepository.save(submission);
        }
    }

    async gradeSumminssion(update: updateGradeDto) {
        const submission = await this.submissionRepository.findOne({
            where: {
                submissionId: update.submissionId,
            },
        });

        if (!submission) {
            throw new HttpException(
                'Not found submission',
                HttpStatus.BAD_REQUEST,
            );
        } else {
            const upDate = await this.submissionRepository.update(
                {
                    submissionId: update.submissionId,
                },
                {
                    score: update.score,
                },
            );
            return {
                status: 200,
                message: `Successfully update submission: ${submission}`,
            };
        }
    }

    async SubmitSameTaskAnotherTime(detalis: submitAgain) {
        const submission = await this.submissionRepository.findOne({
            where: {
                submissionId: detalis.submissionId,
            },
        });
        if (!submission) {
            throw new HttpException(
                'Not Found Submission',
                HttpStatus.BAD_REQUEST,
            );
        }

        const scoreNotNull = submission.score != null;

        if (scoreNotNull) {
            const save = (submission.score = null);
            await this.submissionRepository.save(save);
        }

        return {
            status: 200,
            message: `Summite Agian submission: ${submission}`,
        };
    }

    async deleteSubmission(detalis: deleteSubmissionParam) {
        const submission = await this.submissionRepository.findOne({
            where: {
                submissionId: detalis.submissionId,
            },
        });

        return this.submissionRepository.remove(submission);
    }

    async getTask(detalis: TaskIdParam) {
        const task = await this.taskRepository.findOne({
            where: {
                taskId: detalis.taskId,
            },
            relations: {
                hasSubmissions: true,
            },
        });

        return task;
    }

    async setPath(filepath: string, submissionId: number) {
        const submission = await this.findSubmission(submissionId);
        if (submission) {
            submission.filePath = filepath;
            this.submissionRepository.save(submission);
            return submission;
        } else {
            throw new HttpException(
                'Submission does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
