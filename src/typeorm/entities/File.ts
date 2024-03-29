import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    UpdateDateColumn,
} from "typeorm";
import { Submission } from "./Submission";
import { User } from "./User";
import { Challenge } from "./Challenge";
import { Item } from "./Item";


@Entity({ name: 'files' })
export class File {

    @PrimaryGeneratedColumn()
    fileId : number ;

    @Column()
    path? : string ;

    @CreateDateColumn()
    createdAtDate : Date ;

    @UpdateDateColumn()
    editDate? : Date ;

    
    @OneToOne(()=> User , (user) => user.file)
    user? : User;

    @OneToOne(() => Submission , (submission) => submission.file)
    submission? : Submission ; 


    @OneToOne(() => Challenge , (challenge) => challenge.file)
    challenge? : Challenge ; 

    @OneToOne(() => Item ,(item) => item.file)
    item? : Item ; 


    
}