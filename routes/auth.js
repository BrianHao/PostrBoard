// User Authentication Routes to handle Sign Up, Log In, and Log Out
const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");
const User = require("../models/user")


module.exports = router;