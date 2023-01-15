import * as mongoose from "mongoose";
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//การ ref ส่ง User
const challengeSchema_demo = new Schema({
    // title: String,
    // body: String,
    // // username: String,
    // userid: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    // datePosted: {
    //     type: Date,
    //     default: new Date()
    // },
    // image: String
    challenge_id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    participants: [Object],
    numParticipants: Number,
    host: Object,
    img: String,
    max_user: Number,
    banUser: [Object],
    publishedStatus: Boolean,
    timeStame: new Date(Date.now()),
    start: Date,
    end: Date,
    file: {
        user: Object,
        path: String
    },
    rewards: [
        {
            rankMin: Number,
            rankMax: Number,
            rewardAbsolute: Number,
        }
    ],
    teams: {
        id: Number,
        menubar: [Object]
    },
    teamMaximum: Number,
    feedback: {
        date: new Date(Date.now()),
        text: String,
        name: String
    },
    rating: {
        rating: Number,
        total: Number,
        coint_ClinkRating: Number
    },
    participantsGiveScore: {
        user_Id: Object,
        score: Number,
    },
    schema_version: String
})


const Challenge = mongoose.model('Challenge', challengeSchema_demo);

module.exports = Challenge;

export const challengeSchema = new mongoose.Schema({
    challenge_id: mongoose.Types.ObjectId,
    title: String,
    description: String,
    participants: [Object],
    numParticipants: Number,
    host: Object,
    ing: String,
    max_user: Number,
    banUser: [Object],
    publishedStatus: Boolean,
    timeStame: Date,
    start: Date,
    end: Date,
    file: {
        user: Object,
        path: String
    },
    rewards: [
        {
            rankMin: Number,
            rankMax: Number,
            rewardAbsolute: Number,
        }
    ],
    teams: {
        id: Number,
        menubar: [Object]
    },
    teamMaximum: Number,
    feedback: {
        date: Date,
        text: String,
        name: String
    },
    rating: {
        rating: Number,
        total: Number,
        coint_ClinkRating: Number
    },
    participantsGiveScore: {
        user_Id: Object,
        score: Number,
    },
    schema_version : String

})