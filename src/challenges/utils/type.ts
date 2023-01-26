export type CreateChallengeParams = {

    title: string;
    description: string;
    startDate: Date;
    endDate: Date;



}


export type EditChallengeParams = {

    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    bannerImg:string;
    publishedStatus:Boolean;
    maxParticipants:Number;
    maxTeams:Number;

    
}