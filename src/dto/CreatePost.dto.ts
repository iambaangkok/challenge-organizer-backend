export class CreatePostDto {
    postId: number;
    content: string;
    createdAtDate: Date;
    upDateAt: Date;
    allowComment: boolean;
    displayName: string;
    tabName: string;
    challengeTitle: string;
}