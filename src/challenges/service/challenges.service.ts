import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateChallengeParams, EditChallengeParams } from '../utils/type';

@Injectable()
export class ChallengesService {


    constructor(@InjectRepository(Challenge) private challengeRepository: Repository<Challenge>) { }


    public async findChallengesInDataBase(Challenge: Object) {
        if (!Challenge) { throw new HttpException("Not finded Challenge sorry :/ ", HttpStatus.NOT_FOUND) }
        else { return Challenge }
    }

    findeChallenges() {
        return this.challengeRepository.find();
    }



    async createChallenge(challengeDetails: CreateChallengeParams) {
        const Title = challengeDetails.title
        const challenge = await this.challengeRepository.findOneBy({ title: Title })
        if (!challenge) {
            const newChallenge = this.challengeRepository.create({ ...challengeDetails, timeStamp: new Date() });
            return this.challengeRepository.save(newChallenge)
        } else {
            throw new HttpException("Name of title the same in database",HttpStatus.BAD_REQUEST)
        }
    }

    

    // editChallenge(challenge_Id: String, challengeDetails : EditChallengeParams) {
    //     // const challenge = this.challengeRepository.findOne();
    //     // challenge = this.challengeRepository.update(...challengeDetails);
    //     // return this.challengeRepository.save(challenge);

    // }



    // deleteChallenge(challengeId: JSON) {
    //     // const deleteChallenge = this.challengeRepository.findOne(challengeId);

    //     // return this.challengeRepository.delete(deleteChallenge);
    // }



}
