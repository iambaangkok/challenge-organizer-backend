import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskParams, EditTaskParams, TaskUserParams } from 'src/task/utils/type';
import { Challenge } from '../../typeorm/entities/Challenge';
import { Task } from '../../typeorm/entities/Task';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { FindTaskInUser } from 'src/dto/CreateTask.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Challenge)
        private challengeRepository: Repository<Challenge>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }



    async findTasks() {
        return await this.taskRepository.find()
    }


    async findTaskByDisplayName(userDetile: TaskUserParams) {
        const user = await this.userRepository.findOne({
            where: {
                displayName: userDetile.displayName
            },
            relations: {
                challenges: true,
            }
        })
        if (user.challenges.length === 0) {
            throw new HttpException("Not join challenge", HttpStatus.BAD_REQUEST)
        }
        const listIdChallege = []
        for (let i = 0; i < user.challenges.length; ++i) {
            console.log(user.challenges[i].challengeId)
            listIdChallege.push(user.challenges[i].challengeId)
        }
        const task = await this.taskRepository.find({
            relations: {
                hasChallenges: true
            }
        }
        )
        if (!user) {
            throw new HttpException("Not found user", HttpStatus.BAD_REQUEST)
        } else {
            const listTask = []
            for (let i = 0; i < listIdChallege.length; i++) {
                for (let j = 0; j < task.length; j++) {
                    if (task[j].hasChallenges.challengeId == listIdChallege[i]) {
                        console.log(task[i])
                        listTask.push(task[i])
                    }

                }

            }
            return listTask
        }


    }

    async createTask(taskDetile: CreateTaskParams, challengeTitle: string) {

        const challenge = await this.challengeRepository.findOne({
            where: { challengeTitle: challengeTitle }
        })


        if (challenge) {
            const newTask = this.taskRepository.create({
                ...taskDetile,
                createdAt: new Date(),
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
            return { ...editTask }

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
