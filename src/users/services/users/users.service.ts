import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreatePostParams, CreateUserParams } from 'src/users/utils/type';
import { Http2ServerRequest } from 'http2';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        // @InjectRepository(Post) private postRepository: Repository<Post>

    ) { }


    findUsers() {
        return this.userRepository.find({ relations: ['post'] }); //selet all
    }



    findUserByStdId(student_id: string) {

        return this.userRepository.findOneBy({ student_id });
    }




    createUser(userDetails: CreateUserParams) {

        // const user = this.findUser(studentId)

        // if(!user){
        //     throw new Error(Http2ServerRequest("I have User")())
        // }
        const newUser = this.userRepository.create({
            ...userDetails,
            timestamp: new Date()
        })

        return this.userRepository.save(newUser);
    }



    // async createPost(user_id: ObjectID, postDetails: CreatePostParams) {

    //     const user = await this.userRepository.findOneBy({ user_id })

    //     if (!user)
    //         throw new HttpException(
    //             'User not found. cannot create Post',
    //             HttpStatus.BAD_REQUEST,
    //         )

    //     const newPost = this.postRepository.create({
    //         ...postDetails,
    //         timeStamp: new Date(),
    //         user
    //     })

    //     const savePost = await this.postRepository.save(newPost)

    //     return savePost;

    // }

    async Updateuser(){

    }


}
