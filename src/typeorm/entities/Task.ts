import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Challenge } from './Challenge';
import { Submission } from "./Submission";




@Entity({ name: 'tasks' })
export class Task {

    @PrimaryGeneratedColumn()
    taskId: number;

    @Column()
    description?: string;

    @Column({default : 0})
    score?: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    editAt?: Date;

    @Column('bool',{default : false})
    doned?: boolean;


    @Column({nullable : true})
    start?: Date;

    @Column({nullable : true})
    end?: Date;
    
    @ManyToOne(()=> Challenge, (challenge) => challenge.tasks,{
        onDelete : 'CASCADE'
    })
    hasChallenges?: Challenge;


    @OneToMany(() => Submission , (submissions)=> submissions.task,{
        cascade : true,
    })
    hasSubmissions?: Submission[] ;
}