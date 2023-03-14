import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tab } from '../../typeorm/entities/Tab';
import { Repository } from 'typeorm';
import { CreateTabParams, DeleteTabParams, EditTabParams } from '../utils/type';
import { Challenge } from '../../typeorm/entities/Challenge';
import { Post } from '../../typeorm/entities/Post';
import { ChallengesService } from '../../challenges/service/challenges.service';

@Injectable()
export class TabsService {
    constructor(
        @InjectRepository(Tab)
        private tabRepository: Repository<Tab>,
        @InjectRepository(Challenge)
        private readonly challengeService: ChallengesService,
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) { }

    async findAllTab() {
        const tabs = await this.tabRepository.find({
            relations: {hasChallenge: true, posts: true}
        })
        return tabs;
    }

    async findAllTabByChallenge(challengeTitle: string) {
        const challenge = await this.challengeService.findChallenges(challengeTitle);
        if(challenge){
            return challenge.tabs;
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async findTabByName(
        tabName: string,
        challengeTitle: string
        ) {
        const challenge = await this.challengeService.findChallenges(challengeTitle);
        if(challenge){
            const tab = await this.tabRepository.findOne({
                relations: {hasChallenge: true, posts: true},
                where: {
                    tabName: tabName,
                    hasChallenge: challenge
                }
            })
            return tab;
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async createTab(tabDetails: CreateTabParams) {
        const challenge = await this.challengeService.findChallenges(tabDetails.challengeTitle);

        if(challenge){
            const newTab = this.tabRepository.create({
                tabName: tabDetails.tabName,
                hasChallenge: challenge
            })
            await this.tabRepository.save(newTab);
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async editTab(
        tabName: string,
        editTab: EditTabParams
        ) {
        const challenge = await this.challengeService.findChallenges(editTab.challengeTitle);

        if(challenge){
            return await this.tabRepository.update(
                {tabName: tabName, hasChallenge: challenge},
                {...editTab}
            );
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async deleteTab(
        tabName: string,
        deleteTab: DeleteTabParams
        ) {
        const challenge = await this.challengeService.findChallenges(deleteTab.challengeTitle);

        if(challenge){
            const tab = await this.findTabByName(tabName, deleteTab.challengeTitle);
            const postList = tab.posts;
            for(let each in postList){
                await this.postRepository.delete(each);
            }
            await this.tabRepository.delete({tabName: tabName, hasChallenge: challenge});
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
