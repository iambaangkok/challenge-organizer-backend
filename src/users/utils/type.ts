import { ObjectID } from "typeorm";

export type CreateUserParams = {
    username: string;
    cmuAccount: string;
    studentId: string;

}

export type FindUserParams = {
    username: string;
    studentId: string;
}


export type CreatePostParams = {
    // post_id: number;
    // repliedPost: ObjectID;
    // user_id: ObjectID;
    // markdown: string;
    // directChildPost: [];
    // timeStamp: Date;
    // allowComment: Boolean;
}

export type UpdateUserParams = {

    username: string;
    cmuAccount: string;
    studentId: string;
    displayName: string;

}

export type DeleteUserParams = {
    user_id: ObjectID;
    studentId: string;
}

