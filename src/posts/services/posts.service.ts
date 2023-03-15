import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeletePostParams, EditPostParams, FindPostParams } from '../utils/type';
import { CreatePostParams } from '../utils/type';
import { Post } from '../../typeorm/entities/Post';
import { Repository } from 'typeorm';
import { Tab } from '../../typeorm/entities/Tab';
import { Challenge } from '../../typeorm/entities/Challenge';
import { ChallengesService } from '../../challenges/service/challenges.service';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(Tab)
        private tabRepository: Repository<Tab>,
        @InjectRepository(Challenge)
        private challengeRepository: Repository<Challenge>,
        private readonly challengeService: ChallengesService,
        private readonly userService: UsersService
        ) { }

    async findAllPost(){
        return await this.postRepository.find({
            relations: {
                children:true, 
                parent: true, 
                hasTab: true, 
                hasChallenge: true,
                owner: true
            }
        });
    }

    async findByPostId(postId: number) {
        const post = await this.postRepository.findOne({
            relations: {
                children:true, 
                parent: true, 
                hasTab: true, 
                hasChallenge: true,
                owner: true
            },
            where: {postId: postId}
        });
        return post;
    }

    async findPostByTab(tabName: string, challengeTitle: FindPostParams){
        const challenge = await this.challengeService.findChallenges(challengeTitle.challengeTitle)
        console.log(challenge)
        if(challenge){
            let tab;
            for(let i = 0; i < challenge.tabs.length; ++i){
                if(challenge.tabs[i].tabName == tabName){
                    tab = challenge.tabs[i]
                }
            }
            console.log(tab)
            return tab.posts;
        } else {
            throw new HttpException(
                'Challenge does not exist',
                HttpStatus.NOT_FOUND
            );
        }
        
    }

    async createParentPost(postDetails: CreatePostParams) {
        if(postDetails.challengeTitle == null ||
            postDetails.tabName == null ||
            postDetails.displayName == null)
        {
            throw new BadRequestException(
                'You need to put all required fields to create a post',
            );
        }
        const user = await this.userService.findBydisplayName(postDetails.displayName);

        const challenge = await this.challengeRepository.findOne({
            relations: {
                participants: true,
                tasks: true,
                collaborators: true,
                host : true,
                tabs: true
            },
            where: {challengeTitle: postDetails.challengeTitle}
        });
        console.log(challenge.tabs)
        let tab;
        for(let i = 0; i < challenge.tabs.length; ++i){
            if(challenge.tabs[i].tabName == postDetails.tabName){
                tab = challenge.tabs[i]
            }
        }

        if(tab){
            const newPost = this.postRepository.create({
                content: postDetails.content,
                createdAtDate: new Date(),
                upDateAt: new Date(),
                parent: null,
                hasTab: tab,
                hasChallenge: challenge,
                owner: user
            });
            await this.postRepository.save(newPost);
            return newPost;
        } else {
            throw new HttpException(
                'Tab does not exist',
                HttpStatus.NOT_FOUND
            );
        }
    }

    async createChildrenPost(
        postId: number,
        postDetails: CreatePostParams
    ){
        if(postDetails.challengeTitle == null ||
            postDetails.tabName == null)
        {
            throw new BadRequestException(
                'You need to put all required fields to create a post',
            );
        }
        const post = await this.findByPostId(postId);
        console.log(post);
        if(post){
            let postList = post.children;
            const newPost = this.postRepository.create({
                ...postDetails,
                upDateAt: new Date(),
                parent: post,
                hasTab: post.hasTab,
                hasChallenge: post.hasChallenge
            })
            postList.push(newPost);
            post.children = postList;
            await this.postRepository.save(post);
            console.log(newPost);
            await this.postRepository.save(newPost);
            return newPost;
        }else{
            throw new HttpException(
                'Parent post does not exist',
                HttpStatus.NOT_FOUND
            );
        }
    
    }

    async editPost(
        postId: number,
        editPost: EditPostParams)
    {
        const post = await this.findByPostId(postId);
        if(post){
            return await this.postRepository.update(
                { postId: postId },
                { ...editPost, upDateAt: new Date() }
            );
        } else {
            throw new HttpException(
                'Post does not exist',
                HttpStatus.NOT_FOUND
            );
        }
    }

    async deletePost(
        postId: number,
        deletePost: DeletePostParams
        )
    {
        if(deletePost.challengeTitle == null ||
            deletePost.tabName == null){
                throw new BadRequestException(
                    'You need to put all required fields to delete a post',
                );
            }
        const challenge = await this.challengeRepository.findOne({
            relations: {
                participants: true,
                tasks: true,
                collaborators: true,
                host : true,
                tabs: true
            },
            where: {challengeTitle: deletePost.challengeTitle}
        });

        const tab = await this.tabRepository.findOne({
            relations: {hasChallenge: true, posts: true},
            where: {tabName: deletePost.tabName, hasChallenge: challenge}
        });

        if(tab){
            await this.postRepository.delete({postId: postId})
        } else {
            throw new HttpException(
                'Tab does not exist',
                HttpStatus.NOT_FOUND
            )
        }
    }

}
