import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskParams, EditTaskParams } from 'src/task/utils/type';
import { Challenge } from '../../typeorm/entities/Challenge';
import { Task } from '../../typeorm/entities/Task';
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
                await this.taskRepository.save(newTask),
                {
                    taskId: newTask.taskId,
                    description: newTask.description,
                    score: newTask.score
                }
            )
        } else {
            throw new HttpException(
                'Creation failed. Challenge title already existed',
                HttpStatus.NOT_FOUND,
            )
        }

    }


    async editedTask(
        taskId: number,
        editTask: EditTaskParams) {
        const task = await this.taskRepository.findOne({
            where: { taskId: taskId }
        })

        if (task) {
            const updateTask = await this.taskRepository.update(
                { taskId: task.taskId },
                {
                    ...editTask,
                    editAt: new Date()
                }
            )
            return {...editTask}

        } else {
            throw new HttpException(
                'ไม่มี Task นี้ให้อัปเดต',
                HttpStatus.NOT_FOUND
            );
        }


    }



    async deleteTask(taskId: number) {
        const task = await this.taskRepository.findOne({
            where: { taskId: taskId }
        })

        // console.log(typeof(taskId))
        if (task) {
            console.log(`Task has delete ${task.description}`)
            return this.taskRepository.remove(task)
        } else {
            throw new HttpException(
                'ไม่มี Task ให้ลบ',
                HttpStatus.BAD_REQUEST)
        }

    }



}