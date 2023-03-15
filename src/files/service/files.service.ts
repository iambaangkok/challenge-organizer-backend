import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from '../../typeorm/entities/Challenge';
import { File } from '../../typeorm/entities/File';
import { Item } from '../../typeorm/entities/Item';
import { Submission } from '../../typeorm/entities/Submission';
import { Task } from '../../typeorm/entities/Task';
import { User } from '../../typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateFileParams } from '../utils/type';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Challenge)
        private challengeRepository: Repository<Challenge>,
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        @InjectRepository(Submission)
        private submissionRepository: Repository<Submission>,
        @InjectRepository(Task)
        private taskRepository : Repository<Task>

    ) { }


    async fildFiles() {
        return await this.fileRepository.find();
    }

    async getFileById(fileId: number) {
        const file = await this.fileRepository.findOne({
            where: {
                fileId: fileId
            }
        })
        if (!file) { throw new HttpException("Not Found this File", HttpStatus.BAD_REQUEST) }
        else {
            return file
        }
    }

    async createFile(create: CreateFileParams) {
        const user = await this.userRepository.findOne({
            where: {
                displayName: create.displayName
            }
        })
        const challenge = await this.challengeRepository.findOne({
            where: {
                challengeTitle: create.challengeTitle
            }
        })
        const item = await this.itemRepository.findOne({
            where: {
                itemId: create.itemId
            }
        })
        const submission = await this.submissionRepository.findOne({
            where: {
                submissionId: create.submissionId
            }
        })


        if (create.type == "user") {
            const file = await this.fileRepository.create({
                path: create.path,
                createdAtDate: new Date(),
                user: user
            })
            await this.fileRepository.save(file)
        } else if (create.type == "challenge") {
            const file = await this.fileRepository.create({
                path: create.path,
                createdAtDate: new Date(),
                challenge: challenge
            })
            await this.fileRepository.save(file)
        } else if (create.type == "submission") {
            const file = await this.fileRepository.create({
                path: create.path,
                createdAtDate: new Date(),
                submission: submission
            })
            
            await this.fileRepository.save(file)
        } else if (create.type == "item") {
            const file = await this.fileRepository.create({
                path: create.path,
                createdAtDate: new Date(),
                item: item
            })
            await this.fileRepository.save(file)
        } else {
            throw new HttpException("BAD Type is [user ,challenge,submission,item ] ", HttpStatus.BAD_REQUEST)
        }



    }




}
