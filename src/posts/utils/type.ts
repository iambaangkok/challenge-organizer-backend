export type CreatePostParams = {
    content: string;
    createdAtDate: Date;
    upDateAt: Date;
    allowComment: boolean;
    displayName: string;
    tabName: string;
    challengeTitle: string;
};

export type EditPostParams = {
    postId: number;
    content: string;
    createdAtDate: Date;
    upDateAt: Date;
    allowComment: boolean;
    tabName: string;
    challengeTitle: string;
};

export type DeletePostParams = {
    postId: number;
    tabName: string;
    challengeTitle: string;
}

export type FindPostParams = {
    challengeTitle: string;
}