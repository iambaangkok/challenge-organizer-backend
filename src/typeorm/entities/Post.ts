import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';
import { Challenge } from './Challenge';
import { Tab } from './Tab';
import { User } from './User';

@Entity({name:'posts'})
@Tree("materialized-path")
export class Post{
    @PrimaryGeneratedColumn()
    postId: number;

    @Column({type: 'text'})
    content?: string;

    @CreateDateColumn()
    createdAtDate: Date;
    
    @Column()
    upDateAt?: Date;

    @Column({default : true})
    allowComment?: boolean;

    @TreeChildren()
    children?: Post[]

    @TreeParent({ onDelete: 'CASCADE' })
    parent?: Post

    @ManyToOne(() => User, (user) => user.isOwner,{
        cascade: true
    })
    owner?: User;

    @ManyToOne(() => Tab, (tab) => tab.posts, {
        cascade: true
    })
    hasTab?: Tab;

    @ManyToOne(() => Challenge, (challenge) => challenge.posts)
    hasChallenge?: Challenge;
}


