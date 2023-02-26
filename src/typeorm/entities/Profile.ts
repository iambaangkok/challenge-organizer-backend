import { Column, Entity, OneToOne, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { User } from './User';

@Entity({ name: 'profiles' })
export class Profile {
    @ObjectIdColumn()
    profileID: ObjectID;
    @Column()
    photo: string;

    // @OneToOne(() => User, (user) => user.profile)
    user: User;
}
