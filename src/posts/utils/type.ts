import { Challenge } from "src/typeorm/entities/Challenge";
import { Tab } from "src/typeorm/entities/Tab";

export type CreatePostParams = {
    postId: number;
    content: string;
    createdAtDate: Date;
    upDateAt: Date;
    allowComment: boolean;
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
}