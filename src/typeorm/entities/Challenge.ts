import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Unique } from 'typeorm/decorator/Unique';
import { File } from './File';
import { ParticiPantsGiveScore } from './ParticiPantsGiveScore';
import { Rating } from './Rating';
import { Tab } from './Tab';
import { Task } from './Task';
import { User } from './User';
import { Post } from './Post';

@Unique(['challengeTitle'])
@Entity({ name: 'challenges' })
export class Challenge {
    @PrimaryGeneratedColumn()
    challengeId?: number;

    @Column()
    challengeTitle: string;

    @Column()
    description: string;

    @Column({ default: 'single' })
    type?: string;

    @Column({ nullable: true })
    format?: string;

    @Column({ default: 0 })
    numParticipants?: number;

    // @Column({nullable: false})
    // host: string;

    @Column({ nullable: true })
    banckImg?: string;

    @Column({ default: 10 })
    maxParticipants?: number;

    // @Column()
    // banUser: [object];

    @Column({ default: true })
    publishedStatus?: boolean;

    @CreateDateColumn({ nullable: true })
    createdAtDate?: Date;

    @Column({ nullable: true })
    upDateAt?: Date;

    @Column({ nullable: true })
    startDate?: Date;

    @Column({ nullable: true })
    endDate?: Date;

    @Column({ default: false })
    closed?: boolean;
    // @Column()
    // file: {
    //     user: object;
    //     path: string;
    // };
    // @Column()
    // rewards: [
    //     {
    //         rankMin: number;
    //         rankMax: number;
    //         rewardAbsolute: number;
    //     },
    // ];
    // @Column()
    // teams: {
    //     team_id: number;
    //     menubar: [object];
    // };
    @Column({ default: 1 })
    maxTeams?: number;

    @Column({ default: 0 })
    rating?: number;

    @ManyToMany(() => User, (user) => user.challenges, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    participants?: User[];

    // @OneToMany(() => User, (user) => user.challenges, {
    //     cascade: true,
    // })
    // hosts?: User[];

    @ManyToMany(() => User, (user) => user.areCollaboratorsOn, {
        onDelete: 'CASCADE',
    })
    collaborators?: User[];

    @OneToMany(() => Tab, (tab) => tab.hasChallenge, {
        cascade: true,
    })
    tabs?: Tab[];

    @OneToMany(() => Post, (post) => post.hasChallenge, {
        cascade: true,
    })
    posts?: Post[];

    @OneToMany(() => Task, (task) => task.hasChallenges, {
        cascade: true,
    })
    tasks?: Task[];

    @OneToOne(() => File, (file) => file.challenge)
    file?: File;

    @OneToMany(() => Rating, (rating) => rating.challenges, {
        cascade: true,
    })
    ratings?: Rating[];

    @ManyToOne(() => User, (user) => user.hasHost, {
        cascade: true,
    })
    host?: User;
    // @ManyToMany(() => TaskTemplate ,(tasktemeplate) => tasktemeplate.challenges,{
    //     cascade : true,
    // })

    // @OneToMany(() => TaskTemplate , (tasktemeplate) => tasktemeplate.challenges)
    // tasktemeplates : TaskTemplate[];

    // @OneToOne(() => ParticiPantsGiveScore ,{
    //     cascade : true,
    // } )
    // @JoinColumn()
    // particiPantsGiveScore : ParticiPantsGiveScore
}
