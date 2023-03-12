import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
} from '@nestjs/common';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { CreateUserProfileDto } from '../../dto/CreateUserprofile';
import { UpdateUserDto } from '../../dto/Updateuser';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    async viewUsers() {
        return await this.userService.findUsers();
    }

    // @Get(":user_id")
    // async viewUserByUserId(@Param('user_id') user_id :ObjectID) {
    //     return await this.userService.findByUserId(user_id)
    // }

    @Get('/:displayName')
    viewUserByUsername(@Param('displayName') displayName: string) {
        console.log(`GET /${displayName}`);
        return this.userService.findBydisplayName(displayName);
    }

    @Get('/studentId/:studentId')
    async viewUserByStudentId(@Param('studentId') studentId: string) {
        console.log(`GET /studentId/${studentId}`);
        return await this.userService.findUserByStudentId(studentId);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return await this.userService.createUser(createUserDto);
    }

    // @Post('userProfiles')
    // createUserProfile(@Body() createUserProfileDto: CreateUserProfileDto) {
    //     console.log('POST userProfiles');
    //     return this.userService.createUserProfile(createUserProfileDto);
    // }

    @Put('/:displayName')
    updateUser(
        @Param('displayName') displayName: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        console.log(`POST /${displayName}`);
        return this.userService.updateUser(displayName, updateUserDto);
    }

    @Delete('/:displayName')
    async deleteUser(@Param('displayName') displayName: string) {
        console.log(`DELETE /${displayName}`);
        return await this.userService.deleteUser(displayName);
    }
}
