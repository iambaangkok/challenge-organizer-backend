export type CreateUserParams = {
    firstName: string;
    lastName: string;

    cmuAccount: string;
    studentId: string;
};

export type CreateUserProfileParams = {
    photo: string;
};

export type FindUserParams = {
    user_id: string;
    username: string;
    studentId: string;
};

export type CreatePostParams = {
    // post_id: number;
    // repliedPost: string;
    // user_id: string;
    // markdown: string;
    // directChildPost: [];
    // timeStamp: Date;
    // allowComment: Boolean;
};

export type UpdateUserParams = {
    userName: string;
    cmuAccount: string;
    studentId: string;
    displayName: string;
};

export type DeleteUserParams = {
    user_id: string;
    studentId: string;
};
