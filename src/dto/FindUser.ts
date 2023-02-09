import { ObjectID } from "typeorm";

export class FindUserDto{
    userId:string;
    username: string;
    cmuAccount: string;
    studentId: string;
    }