import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    firtname: string;

    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    cmuAccount: string;

    @IsNotEmpty()
    studentId: string;

    //////////////////////////////////////
    // displayname:string;
    // username: string;
    // name:{

    //     fname: string;
    //     lname: string;
    // };

    // cmuAccount: string;
    // studentId: string;
    // rating :Number;
    // challenge:{
    //     joinedChallenge:{
    //         challenge: ObjectID;
    //         task:[ObjectID];
    //     };
    //     banChallenge:[ObjectID];
    //     createdChallenge:[ObjectID];
    // };
    // inventory: [];
    // coin: Number;
    // profileImg: String;
    // equipFrame: String;
    // status: Boolean;
    // task: String;
    // isAdmin: Boolean;
    // timeStamp : Date
}
