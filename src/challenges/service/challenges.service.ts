import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { MongoRepository, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateChallengeParams, EditChallengeParams } from '../utils/type';
import { timeStamp } from 'console';

@Injectable()
export class ChallengesService {

    constructor(@InjectRepository(Challenge) private challengeRepository: MongoRepository<Challenge>) { }

    async findeAllChallenges() {
        return await this.challengeRepository.find();
    }

    async findChallenges(challengeTitle: string) {
        return await this.challengeRepository.findOne({ where: {title: challengeTitle} });
    }

    async createChallenge(challengeDetails : CreateChallengeParams) {
        if(!this.findChallenges(challengeDetails.title)){
            const newChallenge = this.challengeRepository.create({ ...challengeDetails, timestamp: new Date() });
            return await this.challengeRepository.save(newChallenge);
        }else{
            throw new HttpException("This title has been used", HttpStatus.BAD_REQUEST);
        }
    }

    async editChallenge(challengeTitle: string, editChallenge: EditChallengeParams){
        const challenge = this.findChallenges(challengeTitle);
        if(this.findChallenges(challengeTitle)){
            // return await this.challengeRepository.update({title: challengeTitle}, {...editChallenge, timeStamp: new Date()});
        }else{
            throw new HttpException("There is no challenge", HttpStatus.BAD_REQUEST);
        }
    }   

    async deleteChallenge(challengeTitle: string){
        if(this.findChallenges(challengeTitle)){
            return await this.challengeRepository.delete({title: challengeTitle});
        }else{
            throw new HttpException("There is no challenge", HttpStatus.BAD_REQUEST);
        }
    }
}
