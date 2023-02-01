import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { Repository } from 'typeorm';
import { CreateChallengeParams, EditChallengeParams } from '../utils/type';

@Injectable()
export class ChallengesService {


    constructor(@InjectRepository(Challenge) private challengeRepository: Repository<Challenge>) { }



    findeAllChallenges() {
        return this.challengeRepository.find();
    }



    createChallenge(challengeDetails : CreateChallengeParams) {
        const newChallenge = this.challengeRepository.create({...challengeDetails,timestamp: new Date()});

        return this.challengeRepository.save(newChallenge);
    }



    editChallenge(challenge_Id: String,challengeDetails : EditChallengeParams) {
        // const challenge = this.challengeRepository.findOne();
        // challenge = this.challengeRepository.update(...challengeDetails);
        // return this.challengeRepository.save(challenge);

    }



    deleteChallenge(challengeId: JSON) {
        // const deleteChallenge = this.challengeRepository.findOne(challengeId);

        // return this.challengeRepository.delete(deleteChallenge);
    }



}
