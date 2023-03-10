import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Submission } from "./Submission";
import { User } from "./User";



@Entity({ name: 'teams' })
export class Team {



    @PrimaryGeneratedColumn()
    teamId: number;

    @Column()
    name?: string;

    @CreateDateColumn()
    createdAtDate?: Date;

    @Column()
    editDate?: Date;

    @OneToMany(() => Submission , (submission) => submission.hasSubmitTeam,{
        cascade: true
    })
    hasSubmissions?: Submission[] ;


    @OneToMany(()=> User , (user) => user.inTeam,{
        cascade: true
    })
    users?: User[] ;







}