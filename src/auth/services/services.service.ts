import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class ServicesService {



    constructor(
        @Inject('USER_SERVICE') private readonly userService : UsersService,
        ){}
    validateUser(username: string , password :string){

    }
}
