
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'challenges' })
export class Challenge {
    @ObjectIdColumn()
    challengeId: ObjectID;
    // @PrimaryGeneratedColumn({ type: 'bigint' })
    // challengeId: string;
    @Column()
    challengeTitle: string;
    @Column()
    description: string;
    @Column()
    type: string;
    @Column()
    format: string;
    @Column()
    participants: [string];
    @Column()
    numParticipants: number;
    @Column()
    host: Object;
    @Column()
    banckImg: string;
    @Column()
    maxParticipants: number;
    @Column()
    banUser: [Object];
    @Column()
    publishedStatus: boolean;
    @Column()
    timeStamp: Date;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column()
    closed: boolean
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

    // @Column()
    // feedback: {
    //     date: Date;
    //     text: string;
    //     name: string;
    // };

    // @Column()
    // rating: {
    //     rating: number;
    //     total: number;
    //     coint_ClinkRating: number;
    // };

    @Column()
    rating : number

    // @Column()
    // participantsGiveScore: {
    //     username: string;
    //     score: number;
    // };

    // @Column()
    schema_v: string;
    @Column()
    join : boolean;


    // @ManyToMany(()=>)
    // @JoinColumn()
    // challenge : Challenge;

}