import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Task } from "./Task";





@Entity({ name: 'submissions' })
export class Submission {


    @PrimaryGeneratedColumn()
    submissionId: number;

    @Column()
    score: string;

    @CreateDateColumn()
    createDate: Date;

    @Column()
    editDate: Date;

    // @OneToMany(() => Task , (task) => task.submissions,{
    //     cascade : true,
    // })
    // hastask: Submission[]


    @ManyToOne(() => Task, (task) => task.hasSubmissions)
    task: Task

    
    //TODO เดียวจะมันต้องเชื่อมตาราง File ทีมีความสัมพัทธ์




}