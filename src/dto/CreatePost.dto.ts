import { ObjectID } from "typeorm";

export class CreatePostDto {
    // repliedPost: ObjectID;
    user: string;
    markdown: string;
    directChildPost: [];
}