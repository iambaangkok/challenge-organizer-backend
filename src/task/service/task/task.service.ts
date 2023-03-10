import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskParams } from 'src/task/utils/type';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { Task } from 'src/typeorm/entities/Task';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Challenge)
        private challengeRepository: Repository<Challenge>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }



    async findTasks() {
        return await this.taskRepository.find()
    }



    async createTask(taskDetile: CreateTaskParams, challengeTitle: string) {

        const challenge = await this.challengeRepository.findOne({
            where: { challengeTitle: challengeTitle }
        })


        if (challenge) {
            const newTask = this.taskRepository.create({
                ...taskDetile,
                hasChallenges: challenge
            })
            return (
                this.taskRepository.save(newTask),
                newTask
            )
        } else {
            throw new HttpException(
                'Creation failed. Challenge title already existed',
                HttpStatus.NOT_FOUND,
            )
        }

    }


    async deleteTask(taskId: number) {
        const task = await this.taskRepository.findOne({
            where : { taskId : taskId}
        })

        if(task){
            

        }else{

        }

    }



}
