import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams } from 'src/users/utils/type';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { Profile } from 'src/typeorm/entities/Profile';
import { MongoRepository } from 'typeorm/repository/MongoRepository';




@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: MongoRepository<User>,
        @InjectRepository(Profile) private profileRepository: MongoRepository<Profile>
        // @InjectRepository(Post) private postRepository: Repository<Post>

    ) { }

    public async findUserinDataBase(user: Object) {
        if (!user) { throw new HttpException("Not Found user pls new your request ", HttpStatus.NOT_FOUND) }
        else { return user }
    }

    async findUsers() {
        return await this.userRepository.find() //selet all
    }


    async findByUserId(user_id: ObjectID) {
        return await this.userRepository.findOneById(user_id);
    }


    async findUserByStudentId(studentId: string) {
        const user = await this.userRepository.findOneBy({ studentId: studentId })
        return await this.findUserinDataBase(user)
    }


    async findBydisplayName(displayName: string) {
        console.log(displayName)
        const user = await this.userRepository.findOneBy({ displayName: displayName })
        console.log(user)
        return await this.findUserinDataBase(user)

    }


    async createUser(userDetails: CreateUserParams) {
        const studentId = userDetails.studentId
        console.log(studentId)
        const user = await this.userRepository.findOneBy({ studentId: studentId })
        console.log(user)
        const Displayname = 'id' + await (new Date()).getTime();
        if (!user) {
            const newUser = this.userRepository.create({
                ...userDetails,
                timeStamp: new Date(),
                displayName: Displayname,
            })
            return this.userRepository.save(newUser)
        } else {
            throw new HttpException("user already exist", HttpStatus.OK)
        }
    }

    async createUserProfile(userprofiles: CreateUserProfileParams) {
        const user = await this.userRepository.findOneBy({ firstName: "Nonthawat" })
        console.log(userprofiles)
        const newProfile = this.profileRepository.create({ ...userprofiles });
        const saveProfile = await this.profileRepository.save(newProfile)
        user.profile = saveProfile
        console.log(user)
        return await this.userRepository.save(user)
    }


    /**
     * ! ทำการ Update ได้แล้ว
     * @param update_id  studentId ที่จะเอาไปอัพเดต
     * @param updateUserDetails  รายละเอียดที่ต้องใช้ในการ update 1 ครั้ง
     * @returns 
     */
    async updateUser(studentId, updateUserDetails: UpdateUserParams) {
        const user = await this.userRepository.findOneBy({ studentId: studentId })
        console.log(user)
        if (!user) {
            throw new HttpException("ไม่เจอ user ที่จะอัพเดตวะ", HttpStatus.BAD_REQUEST)
        } else {
            console.log("Update done")
            return this.userRepository.update({ studentId: studentId }, {
                ...updateUserDetails,
                timeStamp: new Date()
            })
        }
    }



    async deleteUser(studentId: string) {
        const user = await this.userRepository.findOneBy({ studentId: studentId })
        if (!user) {
            throw new HttpException("ไม่มี user นี้ให้ลบ", HttpStatus.BAD_REQUEST)
        }
        else {
            console.log("delete user complet")
            return await this.userRepository.delete({ studentId: studentId })
        }
    }


    // async deleteAllUsers() {
    //     return this.userRepository.delete(User)
    // }

}
