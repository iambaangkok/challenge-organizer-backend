import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'posts' })
export class Post {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    post_id: number;
    @Column()
    repliedPost: Object;
    @Column()
    user_id: Object;
    @Column()
    markdown: string;
    @Column()
    directChildPost: [];
    @Column()
    timeStamp: Date;
    @Column()
    allowComment: Boolean;




}