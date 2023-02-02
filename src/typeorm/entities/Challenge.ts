
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'challenges' })
export class Challenge {
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
    banckImg: string;
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
    ///ที่ comment ไป เพราะต้องเอาไปสร้างความสัมพันธ์ใหม่
    // @Column()
    // file: { 
    //     user: Object,
    //     path: string;
    // };
    // @Column()
    // reward: [{
    //     rankMin: number,
    //     rankMax: number,
    //     rewardAbsolute: number,
    // }];
    // @Column()
    // teams: {
    //     team_id: number,
    //     menubar: [Object];
    // };
    // @Column()
    // maxTeams: number;

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

    // @Column()
    // participantsGiveScore: {
    //     username: string;
    //     score: number;
    // };

    // @Column()
    schema_v: string;

}