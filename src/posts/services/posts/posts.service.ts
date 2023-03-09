import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EditPostParams } from 'src/posts/utils/type';
import { Post } from 'src/typeorm/entities/Post';
import { User } from 'src/typeorm/entities/User';
import { CreatePostParams } from 'src/posts/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAllPost(){
        return await this.postRepository.find({
            relations: {children:true, parent: true, hasTab: true, hasChallenge: true}
        });
    }

    async findByPostId(postId: number) {
        const post = await this.postRepository.findOne({
            relations: {children:true, parent: true, hasTab: true, hasChallenge: true},
            where: {postId: postId}
        });
        return post;
    }

    async findPostByTab(tabName: string){
        
    }

    async createParentPost(postDetails: CreatePostParams) {
        const newPost = this.postRepository.create({
            ...postDetails,
            upDateAt: new Date(),
            parent: null
        });
        await this.postRepository.save(newPost);
        return newPost;
    }

    async createChildrenPost(
        postId: number,
        postDetails: CreatePostParams
    ){
        const post = await this.findByPostId(postId);
        console.log(post);
        if(post){
            let postList = post.children;
            const newPost = this.postRepository.create({
                ...postDetails,
                upDateAt: new Date(),
                parent: post
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

    async deletePost(postId: number){

    }

}
