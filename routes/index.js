const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");
const middleware = require("../middleware");

// Landing Page for Postr
router.get("/", (req, res) => {
    Post.find({}).sort({created: -1}).limit(10).exec((err, foundPosts) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                foundPosts
            });
        }
    });
});

// Sign up logic
router.post("/signup", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.send(err);
        }
        passport.authenticate("local")(req, res, function(){
            res.status(200).json({
                username: user.username,
                id: user.id
            })
        });
    });
});

// Log in logic
router.post("/login", passport.authenticate("local"), function(req, res){
    res.status(200).json({
        username: req.user.username,
        id: req.user.id
    })
});

// Log out
router.get('/logout', (req, res) => {
	req.logout();
	res.sendStatus(200);
});

module.exports = router;