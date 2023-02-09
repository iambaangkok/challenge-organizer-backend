import {
    Column,
    Entity,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { ObjectIdColumn } from "typeorm/decorator/columns/ObjectIdColumn";
import { ObjectID } from "typeorm/driver/mongodb/typings";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";
import { Profile } from "./Profile";


@Entity({ name: 'users' })
export class User {
    @ObjectIdColumn()
    userId: ObjectID;
    @Column()
    displayName: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    cmuAccount: string;
    @Column()
    studentId: string;
    @Column()
    rating: string;
    @Column()
    timeStamp: Date;
    @Column()
    inventory: [];  // TODO ควรเป็นอีก ตารางไหมที่มีความสัมพันธ์ OneToMany
    @Column()
    coin: string;
    @Column()
    profileImg: string;
    @Column()
    equipmentFrame: string;
    @Column({ default: false })
    banStatus: boolean;
    @Column()
    tasks: string;
    @Column()
    isAdmin: boolean;

    // @OneToOne(() => Profile,(profile) => profile.user,{cascade:true})
    // @JoinColumn()
    @Column()
    profile : Object;

}




