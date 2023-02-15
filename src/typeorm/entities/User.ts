import { Column, Entity } from 'typeorm';
import { ObjectIdColumn } from 'typeorm/decorator/columns/ObjectIdColumn';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { Document } from 'mongoose';

export interface UserDocument extends Document{
    userId: ObjectID;
    displayName: string;
    firstName: string;
    lastName: string;
    cmuAccount: string;
    studentId: string;
    rating: string;
    timeStamp: Date;
    inventory: string[];
    coin: string;
    profileImg: string;
    equipmentFrame: string;
    banStatus: boolean;
    tasks: string;
    isAdmin: boolean;
    profile: object;
    challenges: string[];
}

@Entity({ name: 'users' })
export class User  {
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
    inventory: string[];
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
    @Column()
    profile: object;
    @Column()
    challenges: string[];
}
