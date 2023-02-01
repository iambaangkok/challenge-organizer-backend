import { Column ,Entity,ObjectIdColumn ,ObjectID, OneToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./Post";


@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn({type : 'integer'})
    user_id : ObjectID;
    @Column()
    displayname: string;
    @Column()
    username: string;
    @Column()
    cmuAccount: string;
    @Column()
    student_id: string;
    @Column()
    rating: string;
    @Column()
    timestamp: Date;
    @Column()
    inventory: [] ;  // TODO ควรเป็นอีก ตารางไหมที่มีความสัมพันธ์ OneToMany
    @Column()
    coin: string;
    @Column()
    profileImg : string;
    @Column()
    equipmentFrame: string;
    @Column({default: false})
    banstatus: boolean;
    @Column()
    tasks: string;
    @Column()
    isAdmin : boolean;
    





    @OneToMany(()=> Post,(post)=> post.user_id)
    post: Post[]



}




