import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { Challenge } from './Challenge';
import { File } from './File';
import { Submission } from './Submission';
import { Team } from './Team';


@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    userId: number;
    @Column(
        {
            length: 15,
            unique: true
        }
    )
    displayName: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({ unique: true })
    cmuAccount: string;
    @Column()
    studentId: string;
    @Column()
    rating: string;
    @CreateDateColumn()
    createdDate: Date;
    // @Column()
    // inventory: string[];
    @Column()
    coin: string;
    @Column()
    profileImg: string;
    @Column()
    equipmentFrame: string;
    @Column({ default: false })
    banStatus: boolean;
    @Column()
    tasks: string;
    @Column({ default: false })
    isAdmin: boolean;
    // @Column()
    // profile: object;
    //todo สร้างความสัมพธ์

    // @Column()
    // challenges: string[];
    @ManyToMany(() => Challenge , (challenge) => challenge.participants)
    @JoinTable()
    challenges: Challenge[]


    @ManyToOne(() => Challenge, (challenge) => challenge.hosts)
    challenge : Challenge




    @ManyToMany ( () => Challenge , (challenge) => challenge.collaborators)
    @JoinTable()
    constructors : Challenge[]



    @OneToMany(()=> Submission , (submission)=> submission.hasSubmit,{
        cascade : true,
    })
    submited : Submission[]


    @ManyToOne(()=> Team , (team)=> team.users)
    inTeam : Team ; 
    




    @OneToOne(()=> File , (file)=> file.user)
    file : File;
    


}
