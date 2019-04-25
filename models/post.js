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
    boardName: String,
    boardTitle: String,
    commentCount: {
        type: Number,
        default: 0
    },
    author: {
        // id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User"
        // },
        type: String,
        default: "Admin"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ]
});

module.exports = mongoose.model("Post", postSchema);
