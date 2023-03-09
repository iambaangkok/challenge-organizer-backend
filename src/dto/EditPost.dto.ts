import { Challenge } from "src/typeorm/entities/Challenge";
import { Tab } from "src/typeorm/entities/Tab";

export class EditPostDto {
    postId: number;
    content: string;
    createdAtDate: Date;
    upDateAt: Date;
    allowComment: boolean;
    tabName: string;
    challengeTitle: string;
}