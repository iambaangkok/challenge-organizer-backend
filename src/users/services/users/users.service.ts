import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreatePostParams, CreateUserParams, UpdateUserParams } from 'src/users/utils/type';
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
        return this.userRepository.find(); //selet all
    }



    // findUserByStdId(user_id: ObjectID) {
    //     return this.userRepository.findOneById({ user_id });
    // }




    createUser(userDetails: CreateUserParams) {
        // const user = this.findUserByStdId(userDetails.studentId)
        // if (!user) {
        //     const newUser = this.userRepository.create({
        //         ...userDetails,
        //         timestamp: new Date()
        //     })
        //     return this.userRepository.save(newUser);
        // }
        // else {
        //     throw new HttpException("มี user นี้อยู่แล้ว", HttpStatus.BAD_REQUEST)
        // }

        const newUser = this.userRepository.create({
            ...userDetails,
            timestamp: new Date()
        })
        return this.userRepository.save(newUser)

    }



    updateUser(studentId: string, updateUserDetails: UpdateUserParams) {

        // const user = this.userRepository.findOne({ studentId })

        return this.userRepository.update({ studentId }, {
            ...updateUserDetails,
            timestamp: new Date()
        })
    }


    deleteUser(studentId: string) {
        const user = this.userRepository.findOneBy({ studentId })
        if (!user) {
            throw new HttpException("ไม่มี user นี้ให้ลบ", HttpStatus.BAD_REQUEST)
        }
        else {
            const deleteuser = this.userRepository.delete({ studentId })
            return deleteuser;
        }

    }

}
