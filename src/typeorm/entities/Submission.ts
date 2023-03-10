import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { File } from "./File";
import { Task } from "./Task";
import { Team } from "./Team";
import { User } from "./User";





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



    @ManyToOne(() => Task, (task) => task.hasSubmissions)
    task: Task;



    @ManyToOne(() => User, (user) => user.submited)
    hasSubmit : User;

    @ManyToOne(() => Team , (team) => team.hasSubmissions)
    hasSubmitTeam : Team;

    @OneToOne(() => File , (file) => file.submission)
    file : File;


    //TODO เดียวจะมันต้องเชื่อมตาราง File ทีมีความสัมพัทธ์




}