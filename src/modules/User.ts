import * as mongoose from "mongoose";
// import { ObjextID } from "mongoose";

export const UserSchema = new mongoose.Schema({
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
            challenge : Object,
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
    isAdmin: Boolean













});