import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,    
} from 'typeorm';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Unique } from 'typeorm/decorator/Unique';
import { Challenge } from './Challenge';
// import { ObjectID } from 'typeorm/driver/mongodb/typings';

// @Unique(['displayname'])
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    userId: number;
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
    @CreateDateColumn()
    createdDate: Date;
    // @Column()
    // inventory: string[];
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
    @Column({ default: false })
    isAdmin: boolean;
    // @Column()
    // profile: object;
    //todo สร้างความสัมพธ์

    // @Column()
    // challenges: string[];
    @ManyToMany( (challenge) => Challenge)
    @JoinTable()
    challenges: Challenge[]


}
