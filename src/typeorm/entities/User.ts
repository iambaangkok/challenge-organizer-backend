import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    UpdateDateColumn,
} from 'typeorm';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { Challenge } from './Challenge';
import { File } from './File';
import { Item } from './Item';
import { Post } from './Post';
import { Rating } from './Rating';
import { Submission } from './Submission';
import { Team } from './Team';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column(
        {
            unique: true
        }
    )
    displayName?: string;

    @Column()
    firstName?: string;

    @Column()
    lastName?: string;

    @Column({ unique: true })
    cmuAccount?: string;

    @Column({nullable: true})
    studentId?: string;
    // @Column()
    // rating: string;
    @CreateDateColumn()
    createdDate?: Date;

    @UpdateDateColumn()
    editAtDate?: Date;
    // @Column()
    // inventory: string[];

    @Column({default : "0"})
    coin?: string;
    // @Column()
    // profileImg: string;
    @Column({nullable :true})
    equipmentFrame?: string;

    @Column({ default: false })
    banStatus: boolean;

    // @Column()
    // tasks?: string;

    @Column({ default: false })
    isAdmin?: boolean;

    // @Column()
    // profile: object;
    //todo สร้างความสัมพธ์

    // @Column()
    // challenges: string[];
    @ManyToMany(() => Challenge, (challenge) => challenge.participants)
    @JoinTable()
    challenges?: Challenge[]

    // @ManyToOne(() => Challenge, (challenge) => challenge.hosts,{
    //     onDelete :'CASCADE'
    // })
    // challenge?: Challenge

    @ManyToMany(() => Challenge, (challenge) => challenge.collaborators,{
        cascade : true,
        onDelete : 'CASCADE'
    })
    @JoinTable()
    constructors?: Challenge[]

    @OneToMany(() => Submission, (submission) => submission.hasSubmit, {
        cascade: true,
    })
    submited?: Submission[]

    @ManyToOne(() => Team, (team) => team.users,{
        onDelete : 'CASCADE'
    })
    inTeam?: Team;

    @OneToOne(() => File, (file) => file.user)
    file?: File;

    @OneToMany(() => Item, (item) => item.user, {
        cascade: true,
    })
    items?: Item[];

    @OneToMany(() => Rating, (rating) => rating.user, {
        cascade: true,
    })
    ratings?: Rating[];


    @OneToMany(() => Challenge ,(challenge) => challenge.host,{
        onDelete : 'CASCADE'
    })
    isHost?: Challenge[];

    @OneToMany(() => Post, (post) => post.owner, {
        onDelete : 'CASCADE'
    })
    isOwner?: Post[]
}
