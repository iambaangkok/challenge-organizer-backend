import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import {
    CreateUserParams,
    CreateUserProfileParams,
    UpdateUserParams,
} from 'src/users/utils/type';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { Profile } from 'src/typeorm/entities/Profile';
import { MongoRepository } from 'typeorm/repository/MongoRepository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: MongoRepository<User>,
        @InjectRepository(Profile)
        private profileRepository: MongoRepository<Profile>,
    ) {}

    public async findUserinDataBase(user: object) {
        if (!user) {
            throw new HttpException(
                'User does not exist',
                HttpStatus.NOT_FOUND,
            );
        } else {
            return user;
        }
    }

    async findUsers() {
        return await this.userRepository.find(); //selet all
    }

    async findByUserId(user_id: ObjectID) {
        return await this.userRepository.findOneById(user_id);
    }

    async findUserByStudentId(studentId: string) {
        const user = await this.userRepository.findOneBy({
            studentId: studentId,
        });
        console.log(user);
        return await this.findUserinDataBase(user);
    }

    async findBydisplayName(displayName: string) {
        console.log(displayName);
        const user = await this.userRepository.findOneBy({
            displayName: displayName,
        });
        console.log(user);
        return await this.findUserinDataBase(user);
    }

    async createUser(userDetails: CreateUserParams) {
        const cmuaccount = userDetails.cmuAccount;
        console.log(cmuaccount);
        const user = await this.userRepository.findOneBy({
            cmuAccount: cmuaccount,
        });
        console.log(user);
        const Displayname = 'id' + (await new Date().getTime());
        if (!user) {
            const newUser = this.userRepository.create({
                ...userDetails,
                timeStamp: new Date(),
                displayName: Displayname,
                challenges: [],
            });
            console.log(newUser);
            return (
                this.userRepository.save(newUser),
                { displayName: newUser.displayName }
            );
        } else {
            // throw new HttpException("user already exist", HttpStatus.OK)
            return {
                displayName: user.displayName,
                statusCode: 200,
                message: 'User already existed',
            };
        }
    }

    async createUserProfile(userprofiles: CreateUserProfileParams) {
        const user = await this.userRepository.findOneBy({
            firstName: 'Nonthawat',
        });
        console.log(userprofiles);
        const newProfile = this.profileRepository.create({ ...userprofiles });
        const saveProfile = await this.profileRepository.save(newProfile);
        user.profile = saveProfile;
        console.log(user);
        return await this.userRepository.save(user);
    }

    /**
     * ! ทำการ Update ได้แล้ว
     * @param displayName  displayName ที่จะเอาไปอัพเดต
     * @param updateUserDetails  รายละเอียดที่ต้องใช้ในการ update 1 ครั้ง
     * @returns
     */
    async updateUser(displayName, updateUserDetails: UpdateUserParams) {
        const user = await this.userRepository.findOneBy({
            displayName: displayName,
        });
        console.log(user);
        if (!user) {
            throw new HttpException(
                'User does not exist',
                HttpStatus.BAD_REQUEST,
            );
        } else {
            console.log('Update done');
            return this.userRepository.update(
                { displayName: displayName },
                {
                    ...updateUserDetails,
                    timeStamp: new Date().getTime(),
                },
            );
        }
    }

    async deleteUser(displayName: string) {
        const user = await this.userRepository.findOneBy({
            displayName: displayName,
        });
        if (!user) {
            throw new HttpException(
                'User does not exist',
                HttpStatus.BAD_REQUEST,
            );
        } else {
            const profile = user.profile;
            await this.profileRepository.delete(profile);
            console.log('Successfully deleted user');
            return await this.userRepository.delete({
                displayName: displayName,
            });
        }
    }
}
