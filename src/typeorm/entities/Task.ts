import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Challenge } from './Challenge';
import { Submission } from "./Submission";




@Entity({ name: 'tasks' })
export class Task {

    @PrimaryGeneratedColumn()
    taskId: number;

    @Column()
    description: string;

    @Column({default : 0})
    score: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    editAt: Date;

    @Column('bool',{default : false})
    doned : boolean;



    // @OneToMany(() =>Challenge ,(challenge) => challenge.task,{
    //     cascade : true,
    // })
    // hasChallenges: Challenge[] ; 

    @ManyToOne(()=> Challenge, (challenge) => challenge.tasks)
    hasChallenges: Challenge;


    @OneToMany(() => Submission , (submissions)=> submissions.task,{
        cascade : true,
    })
    hasSubmissions: Submission[] ;
}