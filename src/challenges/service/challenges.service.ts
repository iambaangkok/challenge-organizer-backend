import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/typeorm/entities/Challenge';
import { MongoRepository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import {
    CreateChallengeParams,
    EditChallengeParams,
    JoinLeaveChallengeParams,
} from '../utils/type';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectRepository(Challenge)
        private challengeRepository: MongoRepository<Challenge>,
        @InjectRepository(User) private userRepository: MongoRepository<User>,
    ) {}

    async findAllChallenges() {
        const challenges = await this.challengeRepository.find();
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

    async findeAllChallengesByDisplayName(displayname: string) {
        const user = await this.userRepository.findOneBy({
            displayName: displayname,
        });
        const userId = user.userId;
        console.log(userId.toString());
        const allChallenges = await this.challengeRepository.find();
        console.log(allChallenges[0].participants.length);
        if (user.challenges.length == 0) {
            console.log(':)');
            return allChallenges;
        } else {
            for (let i = 0; i < allChallenges.length; i++) {
                for (let j = 0; j < allChallenges[i].participants.length; j++) {
                    console.log(allChallenges[i].participants[j]);
                    if (allChallenges[i].participants[j] == userId.toString()) {
                        allChallenges[i].join = true;
                        // console.log(allChallenges[i])
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
        return await this.challengeRepository.findOne({
            where: { challengeTitle: challengeTitle },
        });
    }

    async createChallenge(challengeDetails: CreateChallengeParams) {
        const challenge = await this.findChallenges(
            challengeDetails.challengeTitle,
        );
        if (!challenge) {
            const newChallenge = this.challengeRepository.create({
                ...challengeDetails,
                timeStamp: new Date(),
                participants: [],
                join: false,
            });
            await this.challengeRepository.save(newChallenge);
            return { challengeId: newChallenge.challengeId };
        } else {
            throw new HttpException(
                'Cannot create, This title has been used',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async editChallenge(
        challengeTitle: string,
        editChallenge: EditChallengeParams,
    ) {
        if (await this.findChallenges(challengeTitle)) {
            return await this.challengeRepository.update(
                { challengeTitle: challengeTitle },
                { ...editChallenge, timeStamp: new Date() },
            );
        } else {
            throw new HttpException(
                'There is no challenge to edit',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async deleteChallenge(challengeTitle: string) {
        const challenge = await this.findChallenges(challengeTitle);
        if (!challenge) {
            throw new HttpException(
                'There is no challenge to delete',
                HttpStatus.BAD_REQUEST,
            );
        } else {
            if (challenge.participants.length < 1) {
                console.log('Delete done');
                return await this.challengeRepository.delete({
                    challengeTitle: challengeTitle,
                });
            } else {
                for (let i = 0; i < challenge.participants.length; i++) {
                    const user_id = challenge.participants[i];
                    const user = await this.userRepository.findOneById(user_id);
                    if (!user) {
                        continue;
                    } else {
                        const filter = await user.challenges.filter(
                            (e) => e !== challengeTitle,
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
                    message: `Delete ${challengeTitle}Success`,
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
        const challenge = await this.findChallenges(challengeTitle);
        console.log(challenge);
        const user = await this.userRepository.findOneById(
            joinChallenge.userId,
        );
        console.log(user);
        if (challenge) {
            let list = challenge.participants;
            let userList = user.challenges;
            // user part
            if (!userList) {
                userList = [challengeTitle];
            } else {
                userList.push(challengeTitle);
            }
            await this.userRepository.update(
                { userId: user.userId },
                { challenges: userList },
            );

            // challenge part
            if (!list) {
                list = [joinChallenge.userId];
            } else {
                if (
                    list.find((userId) => {
                        return userId === joinChallenge.userId;
                    })
                ) {
                    throw new HttpException(
                        'This user is already join this challenge',
                        HttpStatus.BAD_REQUEST,
                    );
                } else {
                    list.push(joinChallenge.userId);
                }
            }
            await this.challengeRepository.update(
                { challengeTitle: challengeTitle },
                { participants: list, timeStamp: new Date() },
            );
            return { status: 'Joined Done ;) ' };
        } else {
            throw new HttpException(
                'There is no challenge to join',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async leaveChallenge(
        challengeTitle: string,
        leaveChallenge: JoinLeaveChallengeParams,
    ) {
        const challenge = await this.findChallenges(challengeTitle);
        const user = await this.userRepository.findOneById(
            leaveChallenge.userId,
        );
        console.log(user);
        if (challenge) {
            const list = challenge.participants;
            const userList = user.challenges;
            console.log(userList);
            // user part
            if (userList) {
                if (
                    !userList.find((userId) => {
                        return userId === leaveChallenge.userId;
                    })
                ) {
                    throw new HttpException(
                        "This user doesn't join this challenge yet",
                        HttpStatus.BAD_REQUEST,
                    );
                } else {
                    const index = userList.findIndex((userId) => {
                        return userId === leaveChallenge.userId;
                    });
                    userList.splice(index, 1);
                    await this.userRepository.update(
                        { userId: user.userId },
                        { challenges: userList },
                    );
                }
            }

            // challenge part
            if (!list) {
                throw new HttpException(
                    "This user doesn't join this challenge yet",
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                if (
                    !list.find((userId) => {
                        return userId === leaveChallenge.userId;
                    })
                ) {
                    throw new HttpException(
                        "This user doesn't join this challenge yet",
                        HttpStatus.BAD_REQUEST,
                    );
                } else {
                    const index = list.findIndex((userId) => {
                        return userId === leaveChallenge.userId;
                    });
                    list.splice(index, 1);
                }
            }
            return await this.challengeRepository.update(
                { challengeTitle: challengeTitle },
                { participants: list, timeStamp: new Date() },
            );
        } else {
            throw new HttpException(
                'There is no challenge to join',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
