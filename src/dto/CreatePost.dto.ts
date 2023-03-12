export class CreatePostDto {
    postId: number;
    content: string;
    createdAtDate: Date;
    upDateAt: Date;
    allowComment: boolean;
    tabName: string;
    challengeTitle: string;
}