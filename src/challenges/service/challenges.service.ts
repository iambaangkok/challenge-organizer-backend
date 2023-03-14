import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from '../../typeorm/entities/Challenge';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import {
    AddCollaborator,
    CreateChallengeParams,
    DeleteCollaborator,
    EditChallengeParams,
    JoinLeaveChallengeParams,
} from '../utils/type';
import { Repository } from 'typeorm';
import { User } from '../../typeorm/entities/User';

@Injectable()
export class ChallengesService {
    constructor(
        @InjectRepository(Challenge)
        private challengeRepository: Repository<Challenge>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAllChallenges() {
        const challenges = await this.challengeRepository.find({
            relations: {
                participants: true,
                collaborators: true,
            },
        });
        const challengesObject: Record<string, any>[] = [];
        for (let i = 0; i < challenges.length; i++) {
            challengesObject.push(challenges[i]);
            challengesObject[i].join = false;
        }
        console.log(challengesObject[0]);
        return challengesObject;
    }

    async findAllChallengesByDisplayName(displayName: string) {
        const user = await this.userRepository.findOne({
            relations: {
                challenges: true,
            },
            where: {
                displayName: displayName,
            },
        });
        const allChallenges: Record<string, any>[] =
            await this.findAllChallenges();
        if (user == null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const userDisplayName = user.displayName;
        if (user.challenges.length == 0) {
            console.log(':)');
            return allChallenges.map((chal) => {
                chal.join = false;
                return chal;
            });
        } else {
            for (let i = 0; i < allChallenges.length; i++) {
                for (let j = 0; j < allChallenges[i].participants.length; j++) {
                    if (
                        allChallenges[i].participants[j].displayName ==
                        userDisplayName.toString()
                    ) {
                        allChallenges[i].join = true;
                        break;
                    } else {
                        allChallenges[i].join = false;
                    }
                }
            }
        }
        return allChallenges;
    }

    async findChallenges(challengeTitle: string) {
        const challenge = await this.challengeRepository.findOne({
            relations: {
                participants: true,
                tasks: true,
                collaborators: true,
                host: true,
            },

            where: { challengeTitle: challengeTitle },
        });
        console.log('challengeTitle = ' + challengeTitle);
        console.log(challenge);
        return challenge;
    }

    async createChallenge(challengeDetails: CreateChallengeParams) {
        const challenge = await this.findChallenges(
            challengeDetails.challengeTitle,
        );

        if (
            challengeDetails.challengeTitle == null ||
            challengeDetails.description == null ||
            challengeDetails.host == null
        ) {
            throw new BadRequestException(
                'You need to put all required fields to create a challenge',
            );
        }

        console.log(challengeDetails.host);

        const user = await this.userRepository.findOne({
            where: { displayName: challengeDetails.host },
        });

        if (!user) {
            throw new HttpException('Not found user', HttpStatus.BAD_REQUEST);
        }
        if (!challenge) {
            console.log(user);
            const newChallenge = this.challengeRepository.create({
                challengeTitle: challengeDetails.challengeTitle,
                description: challengeDetails.description,
                type: challengeDetails.type,
                format: challengeDetails.format,
                numParticipants: challengeDetails.numParticipants,
                endDate: challengeDetails.endDate,
                maxParticipants: challengeDetails.maxParticipants,
                host: user,
                tasks: [],
                participants: [],
                collaborators: [],
            });
            await this.challengeRepository.save(newChallenge);

            return { challengeTitle: newChallenge.challengeTitle };
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
        if (await this.findChallenges(challengeTitle)) {
            return await this.challengeRepository.update(
                { challengeTitle: challengeTitle },
                { ...editChallenge, upDateAt: new Date() },
            );
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND,
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
                challenges: true,
            },
            where: {
                displayName: joinChallenge.displayName,
            },
        });
        console.log(user);
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
                        return (
                            displayName_i.displayName ===
                            joinChallenge.displayName
                        );
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
                challenges: true,
            },
            where: {
                displayName: leaveChallenge.displayName,
            },
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
                        return (
                            challenge_i.challengeTitle ===
                            challenge.challengeTitle
                        );
                    })
                ) {
                    throw new HttpException(
                        'User is not a participant in this challenge',
                        HttpStatus.NOT_MODIFIED,
                    );
                } else {
                    const index = challengeList.findIndex((challenge_i) => {
                        return (
                            challenge_i.challengeTitle ===
                            challenge.challengeTitle
                        );
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
                        return (
                            displayName_i.displayName ===
                            leaveChallenge.displayName
                        );
                    })
                ) {
                    throw new HttpException(
                        'User is not a participant in this challenge',
                        HttpStatus.NOT_MODIFIED,
                    );
                } else {
                    const index = userList.findIndex((displayName_i) => {
                        return (
                            displayName_i.displayName ===
                            leaveChallenge.displayName
                        );
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

    async addCollaborators(addCollaboratorDetails: AddCollaborator) {
        const challenge = await this.challengeRepository.findOne({
            where: {
                challengeTitle: addCollaboratorDetails.challengeTitle,
            },
            relations: {
                collaborators: true,
            },
        });
        const user = await this.userRepository.findOne({
            where: {
                cmuAccount: addCollaboratorDetails.cmuAccount,
            },
        });
        if (!user) {
            throw new HttpException('not found user', HttpStatus.BAD_REQUEST);
        } else {
            if (challenge) {
                const challengeCollaboratorOld = challenge.collaborators;
                challengeCollaboratorOld.push(user);
                challenge.collaborators = challengeCollaboratorOld;
                await this.challengeRepository.save(challenge);
                return {
                    Massage: 'Add collaborators Susese ',
                    CollaboratorName: `${user.displayName}`,
                };
            } else {
                throw new HttpException(
                    'not found challenge',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    async deleteCollaborators(deleteCollaboratorsDetails: DeleteCollaborator) {
        const challenge = await this.challengeRepository.findOne({
            where: {
                challengeTitle: deleteCollaboratorsDetails.challengeTitle,
            },
            relations: {
                collaborators: true,
            },
        });
        const challengeId = challenge.challengeId

        const user = await this.userRepository.findOne({
            where: {
                displayName: deleteCollaboratorsDetails.displayName,
            },
            relations: {
                constructors: true,
            },
        });
        const userId = user.userId
        if (!user) {
            throw new HttpException('ไม่มี user น้า', HttpStatus.BAD_REQUEST);
        } else {
            if (!challenge) {
                throw new HttpException(
                    'Not found challenge',
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                const id = challenge.challengeId;
                challenge.collaborators = challenge.collaborators.filter(
                    (challenge) => {
                        return id !== challengeId;
                    },
                );
                await this.challengeRepository.save(challenge);
                return {
                    Massage: 'Remove Suc',
                    userName: `${user.displayName}`,
                };
            }
        }
    }
}
