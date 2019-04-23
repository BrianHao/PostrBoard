// Post Model
const mongoose = require("mongoose");

// SCHEMA SETUP
let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: String,
    text: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    commentCount: {
        type: Number,
        default: 0
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ]
});

module.exports = mongoose.model("Post", postSchema);
