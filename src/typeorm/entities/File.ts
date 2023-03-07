import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
} from "typeorm";
import { Submission } from "./Submission";
import { User } from "./User";


@Entity({ name: 'files' })
export class File {

    @PrimaryGeneratedColumn()
    fileId : number ;

    @Column()
    path : string ;

    @CreateDateColumn()
    createdAtDate : Date ;

    @Column()
    editDate : Date ;

    
    @OneToOne(()=> User , (user) => user.file)
    user : User;

    @OneToOne(() => Submission , (submission) => submission.file)
    submission : Submission ; 
}