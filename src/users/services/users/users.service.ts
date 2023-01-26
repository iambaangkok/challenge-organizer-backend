import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/users/utils/type';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }


    findUsers() { 
        return this.userRepository.find(); //selet all
    }



    createUser(userDetails: CreateUserParams) {

        const newUser = this.userRepository.create({
            ...userDetails,
            timeStamp: new Date()
        })

       return this.userRepository.save(newUser);
    }



    // editUser(userAddOn : ){



    // }




}
