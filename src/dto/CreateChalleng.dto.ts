import { ObjectID } from "typeorm";



export class CreateChallenge {
    challenge_id:string;
    title: string;
    description: string;
    type: string;
    format: string;
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
        id: number;
        menubar: [ObjectID];
    };
    maxTeams: number;
    feedback :{
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
    schema_v:string;
}
