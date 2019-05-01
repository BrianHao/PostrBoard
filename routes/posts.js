// Posts Routes
const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");
const Board = require("../models/board");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = router;

// CREATE Route - Adds a new Post to the DB
router.post("/", (req, res) => {
    let newPost = {
        title: req.body.postTitle,
        link: req.body.postLink,
        text: req.body.postText,
        boardName: req.body.boardName,
        boardTitle: req.body.boardTitle
    };

    Board.findOne({name: req.params.boardName}, (err, foundBoard) => {
        if(err) {
            console.log("Error retrieving Board.")
			console.log(err);
        } else {
            // Create New Post
            Post.create(newPost, (err, createdPost) => {
                if(err){
                    console.log("Error creating Post.")
                    console.log(err);
                    res.send(err);
                } else {
                    foundBoard.posts.push(createdPost);
                    foundBoard.postCount = foundBoard.postCount+1;
                    foundBoard.save();
                    res.json({
                        created: true,
                        message: "Successfully created Post.",
                        id: createdPost._id
                    });
                }
            });
        }
    });
});

// SHOW Route - Display page for a specific Post
router.get("/:postId", (req, res) => {
    Post.findById(req.params.postId).populate("comments").exec(
        (err, foundPost) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                foundPost
            });
        }
    });
});

// UPDATE Route - Updates Post information
router.put("/:postId", (req, res) => {
    let editPost = {
        title: req.body.postTitle,
        link: req.body.postLink,
        text: req.body.postText,
        updated: new Date().toISOString()
    };
    Post.findByIdAndUpdate(req.params.postId, editPost, (err, updatedPost) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            //console.log(updatedPost);
            res.json({
                edited: true,
            });
        }
    });
});


// DESTROY Route - Deletes Post
router.delete("/:postId", (req, res) => {
    Post.findByIdAndRemove(req.params.postId, (err, removedPost) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            Comment.deleteMany( {_id: { $in: removedPost.comments } }, (err) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    Board.findOne({name: req.params.boardName}, (err, foundBoard) => {
                        if(err) {
                            console.log("Error retrieving Board.")
                            console.log(err);
                        } else {
                            foundBoard.postCount = foundBoard.postCount-1;
                            foundBoard.save();
                            res.json({
                                deleted: true,
                            });
                        }
                    });
                }
            });
        }
    });
});