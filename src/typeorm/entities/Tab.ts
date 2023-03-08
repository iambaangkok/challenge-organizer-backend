import {
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    PrimaryGeneratedColumn,

} from "typeorm";
import { Post } from "./Post";
import { Challenge } from "./Challenge";

@Entity({ name: 'tab' })
export class Tab {
    @PrimaryGeneratedColumn()
    tabId: number;

    @Column(
        {
            length: 40,
            unique: true
        }
    )
    tabName: string;

    @Column({ default: false })
    permission: boolean

    @OneToMany(() => Post, (post) => post.hasTab)
    posts: Post[];

    @ManyToOne(() => Challenge, (challenge) => challenge.tabs)
    hasChallenge: Challenge;
}