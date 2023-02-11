import { ObjectID } from "typeorm";



export class CreateChallengeDto {
    challengeId:number;
    title: string;
    description: string;
    participants: [ObjectID];
    numParticipants: number;
    host: ObjectID;
    bannerImg: string;
    maxParticipants: number;
    banUser: [ObjectID];
    publishedStatus: boolean;
    timeStamp: Date;
    startDate: Date;
    endDate: Date;
    file: {
        user: ObjectID;
        path: string;
    };
    rewards: [{
        rankMin: number,
        rankMax: number,
        rewardAbsolute: number,
    }];
    teams: {
        id: Number;
        menubar: [ObjectID];
    };
    maxTeams: number;
    feedBack :{
        date: Date;
        text: string;
        name: string;
    };
    rating:{
        rating: number;
        total: number;
        coint_ClinkRating: number;
    };
    participantsGiveScore: {
        user_Id: ObjectID;
        score: number;
    };
    schemaVersion:string;
}
