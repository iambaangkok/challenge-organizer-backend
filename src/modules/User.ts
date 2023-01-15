import * as mongoose from "mongoose";


const Schema = mongoose.Schema;


const user = new Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    username: String,
    passwordHasd: String,
    name: {
        fname: String,
        lname: String,
    },
    rating: Number,
    challenge: {
        joinedChallenge: {
            challenge: Object,
            task: Array,
        },
        banChallenge: [Object],
        creatdeChallenge: [Object],
    },
    inventory: Array,
    coin: Number,
    profileIng: String,
    equipFrame: String,
    status: Boolean,
    task: String,
    isAdmin: Boolean,
    timeStamp: new Date(Date.now())
})

const User = mongoose.model('User',user);

module.exports= User;

// import { ObjextID } from "mongoose";
// export const UserSchema = new mongoose.Schema({
//     user_id: mongoose.Schema.Types.ObjectId,
//     username: String,
//     passwordHasd: String,
//     name: {
//         fname: String,
//         lname: String,
//     },
//     rating: Number,
//     challenge: {
//         joinedChallenge: {
//             challenge : Object,
//             task: Array,
//         },
//         banChallenge: [Object],
//         creatdeChallenge: [Object],
//     },
//     inventory: Array,
//     coin: Number,
//     profileIng: String,
//     equipFrame: String,
//     status: Boolean,
//     task: String,
//     isAdmin: Boolean,
//     timeStamp : Date
// });