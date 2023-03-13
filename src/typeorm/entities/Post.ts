import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Tree,
    TreeChildren,
    TreeParent,
    UpdateDateColumn,
} from 'typeorm';
import { Challenge } from './Challenge';
import { Tab } from './Tab';

@Entity({name:'posts'})
@Tree("materialized-path")
export class Post{
    @PrimaryGeneratedColumn()
    postId: number;

    @Column()
    content?: string;

    @CreateDateColumn()
    createdAtDate: Date;
    
    @UpdateDateColumn()
    upDateAt?: Date;

    @Column({default : true})
    allowComment?: boolean;

    @TreeChildren()
    children?: Post[]

    @TreeParent()
    parent?: Post

    @Column()
    owener?: string;

    @ManyToOne(() => Tab, (tab) => tab.posts, {
        cascade: true
    })
    hasTab?: Tab;

    @ManyToOne(() => Challenge, (challenge) => challenge.posts)
    hasChallenge?: Challenge;
}


