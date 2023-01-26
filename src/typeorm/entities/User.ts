import { Column ,Entity,ObjectIdColumn ,ObjectID} from "typeorm";


@Entity({name:'users'})
export class User {

    // @PrimaryGeneratedColumn({ type: 'bigint' })
    @ObjectIdColumn()
    user_id: ObjectID;


    // @Unique()
    // @PrimaryGeneratedColumn({type :'int'})
    // displayname: number;

    // @Column()
    // username: string;

    // @Column()
    // name: {
    //     lname: string;
    //     fname: string;
    // }


    @Column()
    firtname: string;
    
    @Column()
    lastname : string;

    @Column()
    cmuAccount: string;

    @Column()
    studentId: string;

    @Column({default:0})
    rating: Number;


    @Column()
    timeStamp: Date;

    // @Column()
    // challenge: {
    //     joinedChallenge: {
    //         challenge: Object;
    //         task: [Object];
    //     };
    //     banChallenge: [Object];
    //     createdChallenge: [Object];
    // };

    // @Column({default:NaN})
    // inventory: [];

    // @Column({default:0})
    // coin: Number;

    // @Column({default:""})//อาจจะต้องชี้ไปรูปที่เราตั้งในเป็ฯพื้นฐานของเว็บไซย์เราก็ได่
    // profileImg: String;

    // @Column({default:""})
    // equipFrame: String;

    // @Column({default: false}) 
    // status: Boolean;

    // @Column({default:NaN}) 
    // task: String;

    // @Column({default:Boolean}) 
    // isAdmin: Boolean;

    // @Column() 
    // timeStamp: Date;

    // @Column()
    // authStrategy:String;



}




