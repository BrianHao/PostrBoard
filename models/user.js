// User Model
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// SCHEMA SETUP
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);