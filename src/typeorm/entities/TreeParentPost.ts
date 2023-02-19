import { Column } from "typeorm";

export class TreeParentPost{
    @Column()
    comment : string;
    @Column()
    postAt: Date;
    @Column()
    editAt: Date ;
} 