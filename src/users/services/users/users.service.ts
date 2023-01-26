import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/users/utils/type';
import { Http2ServerRequest } from 'http2';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }


    findUsers() { 
        return this.userRepository.find(); //selet all
    }



    findUser(studentId : string){

        return this.userRepository.findOneBy({studentId});
    }

    createUser(userDetails: CreateUserParams) {

        // const user = this.findUser(studentId)

        // if(!user){
        //     throw new Error(Http2ServerRequest("I have User")())
        // }
        const newUser = this.userRepository.create({
            ...userDetails,
            timeStamp: new Date()
        })
    
       return this.userRepository.save(newUser);
    }



    // editUser(userAddOn : ){



    // }




}
