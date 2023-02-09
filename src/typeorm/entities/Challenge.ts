
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'challenges' })
export class Challenge {
    @ObjectIdColumn()
    _id: ObjectID;
    @PrimaryGeneratedColumn({ type: 'bigint' })
    challenge_id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    partipation: string;
    @Column()
    numParticipants: number;
    @Column()
    host: Object;
    @Column()
    bannerImg: string;
    @Column()
    maxParticipants: number;
    @Column()
    banUser: [Object];
    @Column()
    publishedStatus: boolean;
    @Column()
    timestamp: Date;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column()
    file: {
        user: Object,
        path: string;
    };
    @Column()
    rewards: [{
        rankMin: number,
        rankMax: number,
        rewardAbsolute: number,
    }];
    @Column()
    teams: {
        team_id: number,
        menubar: [Object];
    };
    @Column()
    maxTeams: number;

    @Column()
    feedback: {
        date: Date;
        text: string;
        name: string;
    };

    @Column()
    rating: {
        rating: number;
        total: number;
        coint_ClinkRating: number;
    };

    @Column()
    participantsGiveScore: {
        user_Id: Object;
        score: number;
    };

    @Column()
    schema_v: string;

}