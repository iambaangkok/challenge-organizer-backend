import { ObjectID } from "typeorm";

export type CreateChallengeParams = {
   challengeId: number; 
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