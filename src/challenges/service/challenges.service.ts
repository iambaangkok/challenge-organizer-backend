import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from '../../typeorm/entities/Challenge';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import {
    CreateChallengeParams,
    EditChallengeParams,
    JoinLeaveChallengeParams,
} from '../utils/type';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectRepository(Challenge)
        private challengeRepository: Repository<Challenge>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAllChallenges() {
        const challenges = await this.challengeRepository.find({ relations: {participants: true}});
        for (let i = 0; i < challenges.length; i++) {
            const joinTrue = challenges[i].join == true;
            if (joinTrue) {
                challenges[i].join = false;
                await this.challengeRepository.update(
                    { challengeTitle: challenges[i].challengeTitle },
                    { join: challenges[i].join },
                );
            }
        }
        return challenges;
    }

    async findAllChallengesByDisplayName(displayName: string) {
        const user = await this.userRepository.findOne({
            relations: {
                challenges: true
            },
            where: {
                displayName: displayName
            }
        });
        const allChallenges = await this.findAllChallenges();
        if (user == null) {
            return allChallenges;
        }
        const userDisplayName = user.displayName;
        if (user.challenges.length == 0) {
            console.log(':)');
            return allChallenges;
        } else {
            for (let i = 0; i < allChallenges.length; i++) {
                for (let j = 0; j < allChallenges[i].participants.length; j++) {
                    if (allChallenges[i].participants[j].displayName == userDisplayName.toString()) {
                        allChallenges[i].join = true;
                        break;
                    } else {
                        allChallenges[i].join = false;
                    }
                }
                await this.challengeRepository.update(
                    { challengeTitle: allChallenges[i].challengeTitle },
                    { join: allChallenges[i].join },
                );
            }
        }
        return allChallenges;
    }

    async findChallenges(challengeTitle: string) {
        const challenge = await this.challengeRepository.findOne({
            relations: {
                participants: true,
                tasks : true,
                collaborators: true
            },
            where: {challengeTitle: challengeTitle}
        });
        console.log('challengeTitle = ' + challengeTitle)
        console.log(challenge)
        return challenge 
    }

    async createChallenge(challengeDetails: CreateChallengeParams) {
        const challenge = await this.findChallenges(
            challengeDetails.challengeTitle,
        );
        if (!challenge) {
            const newChallenge = this.challengeRepository.create({
                ...challengeDetails,
                participants: [],
            });
            await this.challengeRepository.save(newChallenge);
            return { challengeTitle: newChallenge.challengeTitle };
            // return newChallenge;
        } else {
            throw new HttpException(
                'Creation failed. Challenge title already existed',
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async editChallenge(
        challengeTitle: string,
        editChallenge: EditChallengeParams,
    ) {
        if (await this.findChallenges(challengeTitle)){
            return await this.challengeRepository.update(
                { challengeTitle: challengeTitle },
                { ...editChallenge, upDateAt: new Date() }
            );
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND
            );
        }
    }

    async deleteChallenge(challengeTitle: string) {
        const challenge = await this.findChallenges(challengeTitle);
        if (!challenge) {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND,
            );
        } else {
            if (challenge.participants.length < 1) {
                const deletedChallenge = await this.challengeRepository.delete({
                    challengeTitle: challengeTitle,
                });
                console.log(`Deleted challenge: ${challengeTitle}`);
                return deletedChallenge;
            } else {
                for (let i = 0; i < challenge.participants.length; i++) {
                    const user_id = challenge.participants[i].userId;
                    const user = await this.userRepository.findOneById(user_id);
                    if (!user) {
                        continue;
                    } else {
                        const filter = await user.challenges.filter(
                            (e) => e.challengeTitle !== challengeTitle,
                        );
                        console.log(filter);
                        this.userRepository.update(
                            { userId: user.userId },
                            { challenges: filter },
                        );
                    }
                }
                await this.challengeRepository.delete({
                    challengeTitle: challengeTitle,
                });
                return {
                    status: 200,
                    message: `Successfully delete challenge: ${challengeTitle}`,
                };
            }
        }

        // if (challenge) {
        //     return await this.challengeRepository.delete({ challengeTitle: challengeTitle });
        // } else {
        //     throw new HttpException("There is no challenge to delete", HttpStatus.BAD_REQUEST);
        // }
    }

    async joinChallenge(
        challengeTitle: string,
        joinChallenge: JoinLeaveChallengeParams,
    ) {
        console.log(joinChallenge);
        const challenge = await this.findChallenges(challengeTitle);
        const user = await this.userRepository.findOne({
            relations: {
                challenges: true
            },
            where: {
                displayName: joinChallenge.displayName
            }
        });
        console.log(user)
        if (user == null) {
            throw new HttpException(
                'User does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
        console.log(user);
        if (challenge) {
            let userList = challenge.participants;
            let challengeList = user.challenges;
            // user part
            if (!challengeList) {
                challengeList = [challenge];
            } else {
                challengeList.push(challenge);
            }
            user.challenges = challengeList;
            await this.userRepository.save(user);
            challenge.numParticipants++;

            // challenge part
            if (!userList) {
                userList = [user];
            } else {
                if (
                    userList.find((displayName_i) => {
                        return displayName_i.displayName === joinChallenge.displayName;
                    })
                ) {
                    throw new HttpException(
                        'User is not a participant in this challenge',
                        HttpStatus.NOT_MODIFIED,
                    );
                } else {
                    userList.push(user);
                }
            }
            challenge.participants = userList;
            challenge.upDateAt = new Date();
            await this.challengeRepository.save(challenge);
            return {
                status: 200,
                message: `Successfully joined challenge: ${challengeTitle}`,
            };
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async leaveChallenge(
        challengeTitle: string,
        leaveChallenge: JoinLeaveChallengeParams,
    ) {
        const challenge = await this.findChallenges(challengeTitle);
        const user = await this.userRepository.findOne({
            relations: {
                challenges: true
            },
            where: {
                displayName: leaveChallenge.displayName
            }
        });
        if (user == null) {
            throw new HttpException(
                'User does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
        if (challenge) {
            const userList = challenge.participants;
            const challengeList = user.challenges;
            // user part
            if (challengeList) {
                if (
                    !challengeList.find((challenge_i) => {
                        return challenge_i.challengeTitle === challenge.challengeTitle;
                    })
                ) {
                    throw new HttpException(
                        'User is not a participant in this challenge',
                        HttpStatus.NOT_MODIFIED,
                    );
                
                } else {
                    const index = challengeList.findIndex((challenge_i) => {
                        return challenge_i.challengeTitle === challenge.challengeTitle;
                    });
                    challengeList.splice(index, 1);
                    
                    user.challenges = challengeList;
                    await this.userRepository.save(user);
                }
            } else {
                throw new HttpException(
                    'User is not a participant in this challenge',
                    HttpStatus.NOT_MODIFIED,
                );
            }

            // challenge part
            if (!userList) {
                throw new HttpException(
                    'User is not a participant in this challenge',
                    HttpStatus.NOT_MODIFIED,
                );
            } else {
                if (
                    !userList.find((displayName_i) => {
                        return displayName_i.displayName === leaveChallenge.displayName;
                    })
                ) {
                    throw new HttpException(
                        'User is not a participant in this challenge',
                        HttpStatus.NOT_MODIFIED,
                    );
                } else {
                    const index = userList.findIndex((displayName_i) => {
                        return displayName_i.displayName === leaveChallenge.displayName;
                    });
                    userList.splice(index, 1);
                }
            }
            challenge.participants = userList;
            challenge.upDateAt = new Date();
            challenge.numParticipants--;
            await this.challengeRepository.save(challenge);
            return {
                status: 200,
                message: `Successfully left challenge: ${challengeTitle}`,
            };
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
