import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Tree,
} from 'typeorm';
import { Challenge } from './Challenge';
import { Tab } from './Tab';

@Entity({name:'posts'})
@Tree("materialized-path")
export class Post{
    @PrimaryGeneratedColumn()
    postId: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAtDate: Date;
    
    @Column()
    upDateAt: Date;

    @Column()
    allowComment: boolean;

    @ManyToOne(() => Tab, (tab) => tab.posts, {
        cascade: true
    })
    hasTab: Tab;

    @ManyToOne(() => Challenge, (challenge) => challenge.posts)
    hasChallenge: Challenge;
}


