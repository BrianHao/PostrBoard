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
    image: { 
        type: String,
        default: "https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"
    },
    description: String,
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    postCount: {
        type: Number,
        default: 0
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }    
    ]
});

module.exports = mongoose.model("Board", boardSchema);
