export class EditChallengeDto{
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    bannerImg: string;
    publishedStatus: boolean;
    maxParticipants: number;
    maxTeams: number;
}