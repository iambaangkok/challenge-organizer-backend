import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,

} from "typeorm";
import { Challenge } from "./Challenge";
import { User } from "./User";






@Entity({ name: 'rating' })
export class Rating {

    @PrimaryGeneratedColumn()
    ratingId : number ;

    @Column()
    rating : number ; 

    @CreateDateColumn()
    createAtDate : Date;

    @Column()
    editAtDate : Date;


    @ManyToOne(()=> User , (user)=> user.ratings)
    user : User ;

    @ManyToOne(()=> Challenge , (challenge)=> challenge.rating)
    challenges : Challenge;


}