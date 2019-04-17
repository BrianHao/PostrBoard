const express = require("express");
const router = express.Router({mergeParams: true});
//const passport = require("passport");

// Landing Page for Postr
router.get("/", (req, res) => {
    res.send("Welcome to Postr!");
});

module.exports = router;