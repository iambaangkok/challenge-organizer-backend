import { Column } from "typeorm";


export class TreeChildrenPost{

    @Column()
    comments : string;
    @Column()
    postAt: Date;
    @Column()
    editAt: Date ;
}
