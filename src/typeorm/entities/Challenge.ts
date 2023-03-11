import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
    OneToOne,    
    JoinColumn,
    OneToMany,
    ManyToOne
} from 'typeorm';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Unique } from 'typeorm/decorator/Unique';
import { File } from './File';
import { ParticiPantsGiveScore } from './ParticiPantsGiveScore';
import { Rating } from './Rating';
import { Tab } from './Tab';
import { Task } from './Task';
import { TaskTemplate } from './TaskTemplate';
import { User } from './User'
import { Post } from './Post'

@Unique(["challengeTitle"])
@Entity({ name: 'challenges' })
export class Challenge {
    @PrimaryGeneratedColumn()
    challengeId: number;

    @Column()
    challengeTitle: string;

    @Column()
    description: string;

    @Column({default: "single"})
    type: string;
    
    @Column()
    format: string;

    @Column()
    numParticipants: number;

    @Column()
    hostName: string;

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

    @ManyToMany( () => User , (user) => user.challenges,{
        cascade : true
    })
    participants: User[];


    @ManyToOne(() =>User, (user) => user.hosts,{
        onDelete : 'CASCADE'
    })
    host : User

    @ManyToMany( () => User, (user) => user.constructors)
    collaborators : User[];

    @OneToMany(() => Tab, (tab) => tab.hasChallenge,{
        cascade: true
    })
    tabs: Tab[];

    @OneToMany(() => Post, (post) => post.hasChallenge,{
        cascade: true
    })
    posts: Post[];

    @OneToMany(() => Task, (task) => task.hasChallenges,{
        cascade : true
    })
    tasks : Task[];

    @OneToOne(() => File ,(file) => file.challenge )
    file : File;

    @OneToMany(() => Rating , (rating) => rating.challenges,{
        cascade : true
    })
    ratings : Rating[] ;
 
    // @ManyToMany(() => TaskTemplate ,(tasktemeplate) => tasktemeplate.challenges,{
    //     cascade : true,
    // })

    // @OneToMany(() => TaskTemplate , (tasktemeplate) => tasktemeplate.challenges)
    // tasktemeplates : TaskTemplate[];

    // @OneToOne(() => ParticiPantsGiveScore ,{
    //     cascade : true,
    // } )
    // @JoinColumn()
    // particiPantsGiveScore : ParticiPantsGiveScore

}
