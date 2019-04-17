// Board Model
const mongoose = require("mongoose");

// SCHEMA SETUP
let boardSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    created: {
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
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }    
    ]
});

module.exports = mongoose.model("Board", boardSchema);
