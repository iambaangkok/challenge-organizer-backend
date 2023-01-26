import { Controller, Post, Body, Get, Put, Param, Query } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe ,ParseBoolPipe} from '@nestjs/common/pipes';
import { Request } from 'express';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }


    @Get()
    async getUsers() {
   
        const users = await this.userService.findUsers();
        return users

       // หรือ ใช้ return this.userService.findUsers(); ได้เลยเดียว Nest.js มันจัดการเอง
    }

    @Post() //'create'
    // @UsePipes(new ValidationPipe()) //ใส่ส่วนนี้เพื่อเรียกใช้งานการตรวจสอบความถูกต้อง
    createUser(@Body() createUserDto: CreateUserDto) {


       const {...userDetails} = createUserDto;

       return this.userService.createUser(userDetails);

    }


    @Get(':id')
    getUserById(@Param('id',ParseIntPipe) id: number) {
        console.log(id);
        // response.send("");
        return { id };

    }



    @Put()
    updateUser(@Body() userData: Request) {

    }




    // @Put()
    // editUser(){}


}
