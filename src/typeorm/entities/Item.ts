import {
    Column,
    CreateDateColumn,
    Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn,

} from "typeorm";
import { File } from "./File";
import { User } from "./User";





@Entity({ name: 'item' })
export class Item {


    @PrimaryGeneratedColumn()
    itemId: number;

    @Column()
    inShop? : string; // ไม่แน่ใจ

    @Column()
    price? : number ;

    @CreateDateColumn()
    createAtDate: Date;

    @Column()
    editAtDate?: Date;

    @ManyToOne(()=> User, (user) => user.items)
    user? : User;


    @OneToOne(()=> File , (file) => file.item)
    file?: File;

}