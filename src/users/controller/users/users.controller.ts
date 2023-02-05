import { Controller, Post, Body, Get, Put, Param, Request } from '@nestjs/common';
import { Delete, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe, ParseBoolPipe } from '@nestjs/common/pipes';
import { CreatePostDto } from 'src/dto/CreatePost.dto';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { DeleteUserDto } from 'src/dto/Deleteuser';
import { FindUserDto } from 'src/dto/FindUser';
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

    @Get("/getByUserId")
    async viewUserByUserId(@Body() findUserDetails: FindUserDto) {
        return await this.userService.findByUserId(findUserDetails)
    }



    @Get('/getByUsername')
    viewUserByUsername(@Body() finduserDetails: FindUserDto) {
        return this.userService.findByUsername(finduserDetails);
    }

    @Get('getByStudentId')
    async viewUserByStudentId(@Body() finduserDetails: FindUserDto) {
        return await this.userService.findUserByStudentId(finduserDetails)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        // const create = this.userService.createUser(createUserDto)

        // console.log(createUserDto)
        // response.send('Created')
        return this.userService.createUser(createUserDto)
    }


    // @Get(':id')
    // getUserById(@Param('id') id: string) { 
    //    return this.userService.findUserByStdId(id)
    // }



    @Put()
    updateUser(@Body() updateUserDto: UpdateUserDto) {
        const update_id = updateUserDto.update_id
        console.log(update_id)
        return this.userService.updateUser(update_id, updateUserDto)
    }

    @Delete()
   async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
        return await this.userService.deleteUser(deleteUserDto)

    }

    // @Post(':id/posts')
    // createPost(
    //     @Param('user_id') user_id: ObjectID,
    //     @Body() createPost: CreatePostDto
    // ) {
    //     return this.userService.createPost(user_id,createPost)
    // }


}
