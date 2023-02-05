import { ObjectID } from "typeorm";

export class FindUserDto{
    user_id:ObjectID
    username: string;
    cmuAccount: string;
    studentId: string;
    }