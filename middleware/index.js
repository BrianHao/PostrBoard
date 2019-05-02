const Board = require("../models/board");
const Post = require("../models/post");
const Comment = require("../models/comment");

// all the middlewares go here
let middlewareObj = {};


middlewareObj.checkBoardOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                //does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else { //if not logged in, redirect
        res.redirect("back");
    }
};

middlewareObj.checkPostOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                //does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else { //if not logged in, redirect
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
    //if user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //does user own comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else { //if not logged in, redirect
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;