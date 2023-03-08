import { Column, CreateDateColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Challenge } from "./Challenge";




export class TaskTemplate{



    @PrimaryGeneratedColumn()
    taskTemplateId : number;

    @Column()
    markDown : string;  

    @Column()
    type : string;

    @CreateDateColumn()
    createdAt : Date;

    // @ManyToOne(() => Challenge ,(challenge) => challenge.tasktemeplates,{
    //     cascade : true,
    // })
    // // @JoinTable()
    // challenges :Challenge[]
}