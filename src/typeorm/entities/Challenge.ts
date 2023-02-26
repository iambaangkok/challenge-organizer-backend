import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,    
} from 'typeorm';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Unique } from 'typeorm/decorator/Unique';
import { User } from './User'

@Unique(["challengeTitle"])
@Entity({ name: 'challenges' })
export class Challenge {
    @PrimaryGeneratedColumn()
    challengeId: number;
    @Column()
    challengeTitle: string;
    @Column()
    description: string;
    @Column()
    type: string;
    @Column()
    format: string;
    @Column()
    numParticipants: number;
    @Column()
    host: string;
    @Column()
    banckImg: string;
    @Column()
    maxParticipants: number;
    // @Column()
    // banUser: [object];
    @Column({default: true})
    publishedStatus: boolean;
    @CreateDateColumn()
    createdAtDate: Date;
    @Column()
    upDateAt: Date;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column({default: false})
    closed: boolean;
    // @Column()
    // file: {
    //     user: object;
    //     path: string;
    // };
    // @Column()
    // rewards: [
    //     {
    //         rankMin: number;
    //         rankMax: number;
    //         rewardAbsolute: number;
    //     },
    // ];
    // @Column()
    // teams: {
    //     team_id: number;
    //     menubar: [object];
    // };
    @Column({default : 1 })
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


    @Column({default :false})
    join: boolean;

    @ManyToMany( (user) => User)
    participants: User[];
}
