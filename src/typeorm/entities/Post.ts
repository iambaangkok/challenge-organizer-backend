
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { TreeChildrenPost } from "./TreeChildrenPost";
import { TreeParentPost } from "./TreeParentPost";


@Entity({name:'posts'})
export class Post{
    @ObjectIdColumn()
    postId : ObjectID;
    @Column()
    userId : string;
    @Column()
    title : string;
    @Column()
    description : string;
    @Column()
    postAt: Date;
    @Column()
    editAt: Date ;
    @Column((type)=>TreeChildrenPost)
    treeChildren : TreeChildrenPost[];
    @Column((type)=> TreeParentPost)
    treeParent : TreeParentPost;
}


