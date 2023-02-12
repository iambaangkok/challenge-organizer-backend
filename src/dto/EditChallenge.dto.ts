export class EditChallengeDto{
    challengeId:string;
    challengeTitle: string;
    type: string;
    format: string;
    description: string;
    startDate: Date;
    endDate: Date;
    numParticipants: number;
    maxParticipants: number;
    rating: number;
    closed: boolean
    bannerImg: string;
    publishedStatus : boolean
    maxTeams : number
}