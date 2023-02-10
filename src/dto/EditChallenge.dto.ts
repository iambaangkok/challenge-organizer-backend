export class EditChallengeDto{
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    bannerImg:string;
    publishedStatus:Boolean;
    maxParticipants:Number;
    maxTeams:Number;
}