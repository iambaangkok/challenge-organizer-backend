import { Column ,Entity,ObjectIdColumn ,ObjectID, OneToOne, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";

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
    studentId: string;
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
    






}




