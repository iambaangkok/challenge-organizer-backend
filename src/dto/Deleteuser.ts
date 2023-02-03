import { ObjectID } from "typeorm";

export class DeleteUserDto {
user_id: ObjectID;
studentId: string;
}