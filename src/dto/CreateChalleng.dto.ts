import { ObjectID } from "typeorm";



export class CreateChallenge {
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

    participants: [ObjectID];
    host: ObjectID;
    banUser: [ObjectID];
    publishedStatus: boolean;
    timeStamp: Date;
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
        id: number;
        menubar: [ObjectID];
    };
    maxTeams: number;
    feedBack :{
        date: Date;
        text: string;
        name: string;
    };
    // rating:{
    //     rating: number;
    //     total: number;
    //     coint_ClinkRating: number;
    // };
    participantsGiveScore: {
        user_Id: ObjectID;
        score: number;
    };
    schemaVersion:string;
}
