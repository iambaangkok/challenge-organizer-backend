import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { MongoRepository, Repository } from 'typeorm';
import { CreateChallengeParams, EditChallengeParams } from '../utils/type';

@Injectable()
export class ChallengesService {

    constructor(@InjectRepository(Challenge) private challengeRepository: MongoRepository<Challenge>) { }

    async findeAllChallenges() {
        return await this.challengeRepository.find();
    }

    async findChallenges(challengeTitle: string) {
        return await this.challengeRepository.findOne({ where: {title: challengeTitle} });
    }
}