const express = require("express");
const router = express.Router({mergeParams: true});
//const passport = require("passport");

router.get("/", (req, res) => {
    res.send("Welcome to Postr!");
});

module.exports = router;