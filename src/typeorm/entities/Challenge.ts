import {
    Column,
    Entity,
    ObjectID,
    ObjectIdColumn,
} from 'typeorm';

@Entity({ name: 'challenges' })
export class Challenge {
    @ObjectIdColumn()
    challengeId: ObjectID;
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
    host: string;
    @Column()
    banckImg: string;
    @Column()
    maxParticipants: number;
    @Column()
    banUser: [object];
    @Column()
    publishedStatus: boolean;
    @Column()
    timeStamp: Date;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column()
    closed: boolean;
    @Column()
    file: {
        user: object;
        path: string;
    };
    @Column()
    rewards: [
        {
            rankMin: number;
            rankMax: number;
            rewardAbsolute: number;
        },
    ];
    @Column()
    teams: {
        team_id: number;
        menubar: [object];
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
    rating: number;

    // @Column()
    // participantsGiveScore: {
    //     username: string;
    //     score: number;
    // };

    // @Column()
    schema_v: string;
    @Column()
    join: boolean;

    // @ManyToMany(()=>)
    // @JoinColumn()
    // challenge : Challenge;
}
