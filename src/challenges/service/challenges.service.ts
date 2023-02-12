import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { MongoRepository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateChallengeParams, EditChallengeParams, JoinLeaveChallengeParams } from '../utils/type';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class ChallengesService {

    constructor(
        @InjectRepository(Challenge) private challengeRepository: MongoRepository<Challenge>
        ,@InjectRepository(User) private userRepository: MongoRepository<User>
    ) { }

    async findeAllChallenges() {
        return await this.challengeRepository.find();
    }

    async findChallenges(challengeTitle: string) {
        return await this.challengeRepository.findOne({ where: {challengeTitle: challengeTitle} });
    }

    async createChallenge(challengeDetails : CreateChallengeParams) {
        const challenge = await this.findChallenges(challengeDetails.challengeTitle);
        if(!challenge){
            const newChallenge = this.challengeRepository.create({ ...challengeDetails, timestamp: new Date() });
            return await this.challengeRepository.save(newChallenge);
        }else{
            throw new HttpException("Cannot create, This title has been used", HttpStatus.BAD_REQUEST);
        }
    }

    async editChallenge(challengeTitle: string, editChallenge: EditChallengeParams){
        if(await this.findChallenges(challengeTitle)){
            return await this.challengeRepository.update({ challengeTitle: challengeTitle }, { ...editChallenge, timestamp: new Date() });
        }else{
            throw new HttpException("There is no challenge to edit", HttpStatus.BAD_REQUEST);
        }
    }   

    async deleteChallenge(challengeTitle: string){
        if(await this.findChallenges(challengeTitle)){
            return await this.challengeRepository.delete({challengeTitle: challengeTitle});
        }else{
            throw new HttpException("There is no challenge to delete", HttpStatus.BAD_REQUEST);
        }
    }

    async joinChallenge(challengeTitle: string, joinChallenge: JoinLeaveChallengeParams){
        const challenge = await this.findChallenges(challengeTitle);
        const user = await this.userRepository.findOneBy({where: { userId: joinChallenge.userId}});
        if(challenge){
            let list = challenge.participants;
            let userList = user.challenges;
            // user part
            if(!userList){
                userList = [challengeTitle];
            }else{
                userList.push(challengeTitle);
            }
            await this.userRepository.update({ userId: user.userId }, {challenges: userList});

            // challenge part
            if(!list){
                list = [joinChallenge.userId];
            }else{
                if(list.find((userId) => { return userId === joinChallenge.userId})){
                    throw new HttpException("This user is already join this challenge", HttpStatus.BAD_REQUEST);
                }else{
                    list.push(joinChallenge.userId);
                }
            }
            return await this.challengeRepository.update({ challengeTitle: challengeTitle }, { participants: list, timestamp: new Date() });
        }else{
            throw new HttpException("There is no challenge to join", HttpStatus.BAD_REQUEST);
        }
    }

    async leaveChallenge(challengeTitle: string, leaveChallenge: JoinLeaveChallengeParams){
        const challenge = await this.findChallenges(challengeTitle);
        const user = await this.userRepository.findOneBy({where: { userId: leaveChallenge.userId}});
        if(challenge){
            const list = challenge.participants;
            const userList = user.challenges;
            // user part
            if(userList){
                if(!userList.find((userId) => { return userId === leaveChallenge.userId })){
                    throw new HttpException("This user doesn't join this challenge yet", HttpStatus.BAD_REQUEST);
                }else{
                    const index = userList.findIndex((userId) => { return userId === leaveChallenge.userId});
                    userList.splice(index, 1);
                    await this.userRepository.update({ userId: user.userId }, {challenges: userList});
                }
            }

            // challenge part
            if(!list){
                throw new HttpException("This user doesn't join this challenge yet", HttpStatus.BAD_REQUEST);
            }else{
                if(!list.find((userId) => { return userId === leaveChallenge.userId})){
                    throw new HttpException("This user doesn't join this challenge yet", HttpStatus.BAD_REQUEST);
                }else{
                    const index = list.findIndex((userId) => { return userId === leaveChallenge.userId});
                    list.splice(index, 1);
                }
            }
            return await this.challengeRepository.update({ challengeTitle: challengeTitle }, { participants: list, timestamp: new Date() });
        }else{
            throw new HttpException("There is no challenge to join", HttpStatus.BAD_REQUEST);
        }
    }
}
