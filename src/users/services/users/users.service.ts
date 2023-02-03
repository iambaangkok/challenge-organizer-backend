import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ObjectID, Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreatePostParams, CreateUserParams, DeleteUserParams, FindUserParams, UpdateUserParams } from 'src/users/utils/type';
import { Http2ServerRequest } from 'http2';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Console } from 'console';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        // @InjectRepository(Post) private postRepository: Repository<Post>

    ) { }

    async findUsers() {
        return await this.userRepository.find(); //selet all
    }
    //ToDo
    async findByUserId(user_id: ObjectID) {
        const user = await this.userRepository.findOneBy({ user_id });
        console.log(user)
        return user

    }


    async findUserByStudentId(student_id: string): Promise<User> | undefined {
        const studentId = student_id
        const findUser = await this.userRepository.findOneBy({ studentId: studentId })
        return findUser
    }


    async findByUsername(userDetails: FindUserParams) {
        const username = userDetails.username
        const user = await this.userRepository.findOneBy({ username: username })
        console.log(user)
        if (!user) {
            throw new HttpException("หาไม่เจอ is null", HttpStatus.NOT_FOUND)
        } else {
            return user
        }
    }


    async createUser(userDetails: CreateUserParams) {
        const studentId = userDetails.studentId
        console.log(studentId)
        const findUser = await this.userRepository.findOneBy({ studentId: studentId })
        console.log(findUser)
        if (!findUser) {
            const newUser = this.userRepository.create({
                ...userDetails,
                timestamp: new Date(),
            })
            return this.userRepository.save(newUser)
        } else {
            throw new HttpException("user already exist", HttpStatus.OK)
        }


    }


/**
 * ! ทำการ Update ได้แล้ว
 * @param update_id  studentId ที่จะเอาไปอัพเดต
 * @param updateUserDetails  รายละเอียดที่ต้องใช้ในการ update 1 ครั้ง
 * @returns 
 */
    async updateUser(update_id, updateUserDetails: UpdateUserParams) {
        const user = await this.userRepository.findOneBy({ studentId:update_id })
        console.log(user)
        if (!user) {
            throw new HttpException("ไม่เจอ user ที่จะอัพเดตวะ", HttpStatus.BAD_REQUEST)
        } else {
            console.log("Update done")
            return this.userRepository.update({ studentId:update_id }, {
                ...updateUserDetails,
                timestamp: new Date()
            })
        }
    }
//TODO แม่งมันลบหมดเฉย รอการแก้ไข น่าจะเป็นตอนจำลบมันยืนยันตัวไม่ได้มันลบใน colccsions หมดเลย
    async deleteUser(deleteUserDetails: DeleteUserParams) {
        const student_id = deleteUserDetails.studentId
        console.log(student_id)
        const user = await this.userRepository.findOneBy({ studentId: student_id })
        console.log(user)
        if (!user) {
            throw new HttpException("ไม่มี user นี้ให้ลบ", HttpStatus.BAD_REQUEST)
        }
        else {
            console.log("delete user complet")
            return await this.userRepository.delete({ studentId: student_id })
        }
    }

}
