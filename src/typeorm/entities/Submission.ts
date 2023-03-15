import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { File } from "./File";
import { Task } from "./Task";
import { Team } from "./Team";
import { User } from "./User";





@Entity({ name: 'submissions' })
export class Submission {


    @PrimaryGeneratedColumn()
    submissionId: number;

    @Column({default : null,nullable : true})
    score?: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    editDate?: Date;



    @ManyToOne(() => Task, (task) => task.hasSubmissions,{
        onDelete : 'CASCADE'
    })
    task?: Task;

    @ManyToOne(() => User, (user) => user.submited,{
        onDelete : 'CASCADE'
    })
    hasSubmit? : User;

    @ManyToOne(() => Team , (team) => team.hasSubmissions,{
        onDelete : 'CASCADE'
    })
    hasSubmitTeam?: Team;

    @OneToOne(() => File , (file) => file.submission,{
        onDelete : 'CASCADE'
    })
    file? : File;


    //TODO เดียวจะมันต้องเชื่อมตาราง File ทีมีความสัมพัทธ์




}