// Comment Model
const mongoose = require("mongoose");

// SCHEMA SETUP
let commentSchema = new mongoose.Schema({
    text: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    postId: String
});

module.exports = mongoose.model("Comment", commentSchema);
