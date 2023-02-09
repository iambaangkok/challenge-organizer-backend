import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { MongoRepository, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateChallengeParams } from '../utils/type';

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
}
