import { ObjectID } from "typeorm";

export class CreatePost {
    post_ID: string;
    repliedPost: ObjectID;
    user: ObjectID;
    markdown: string;
    directChildPost: [];
    timeStamp: Date;
    allowComment: boolean;
}