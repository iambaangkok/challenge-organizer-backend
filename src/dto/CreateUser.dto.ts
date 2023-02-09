// import { IsNotEmpty, IsEmail, IsNumber, IsString } from "class-validator";



export class CreateUserDto {

    fristName: string; 
    lastName: string;
    // @IsNotEmpty()
    // @IsEmail()
    cmuAccount: string;
    // @IsString()
    studentId: string;
}


