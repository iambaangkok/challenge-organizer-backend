import * as mongoose from "mongoose";



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