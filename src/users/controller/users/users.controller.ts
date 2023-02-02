import { Controller, Post, Body, Get, Put, Param, Query } from '@nestjs/common';
import { Delete, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe, ParseBoolPipe } from '@nestjs/common/pipes';
import { Request } from 'express';
import { CreatePostDto } from 'src/dto/CreatePost.dto';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { Deleteuser } from 'src/dto/Deleteuser';
import { UpdateUserDto } from 'src/dto/Updateuser';
import { UsersService } from 'src/users/services/users/users.service';
import { ObjectID } from 'typeorm';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }


    @Get()
    async viewUsers() {
        const users = await this.userService.findUsers();
        return users

        // หรือ ใช้ return this.userService.findUsers(); ได้เลยเดียว Nest.js มันจัดการเอง
    }

    @Post() //'create'
    // @UsePipes(new ValidationPipe()) //ใส่ส่วนนี้เพื่อเรียกใช้งานการตรวจสอบความถูกต้อง
    createUser(@Body() createUserDto: CreateUserDto) {

        // const { ...userDetails } = createUserDto;
        return this.userService.createUser(createUserDto);

    }


    // @Get(':id')
    // getUserById(@Param('id') id: string) { 
    //    return this.userService.findUserByStdId(id)
    // }



    @Put()
    updateUser(@Body() updateUserDto: UpdateUserDto) {
        const studentId = updateUserDto.id
        return this.userService.updateUser(studentId,updateUserDto)
    }

    @Delete()
    async deleteUser(@Param('studentId',) studentId :string) {
        await this.userService.deleteUser(studentId)

    }

    // @Post(':id/posts')
    // createPost(
    //     @Param('user_id') user_id: ObjectID,
    //     @Body() createPost: CreatePostDto
    // ) {
    //     return this.userService.createPost(user_id,createPost)
    // }


}
