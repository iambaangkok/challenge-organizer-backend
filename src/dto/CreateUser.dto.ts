import { IsNotEmpty, IsEmail, IsNumber, IsString } from "class-validator";



export class CreateUserDto {

    @IsNotEmpty()
    username: string;
    @IsEmail()
    cmuAccount: string;
    @IsString()
    studentId: string;




}