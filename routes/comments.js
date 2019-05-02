// Comments Routes
const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = router;

// COMMENT POST ROUTE - Creates a new comment
router.post("/", (req, res) => {
    let newComment = {
        text: req.body.comment,
        postId: req.body.postId,
        author: {
            id: req.body.id,
            username: req.body.username
        }
    };
    Post.findById(req.params.postId, (err, foundPost) => {
        if(err) {
            console.log("Error retrieving Post.")
			console.log(err);
        } else {
            // Create New Comment
            Comment.create(newComment, (err, createdComment) => {
                if(err){
                    console.log("Error creating Comment.")
                    console.log(err);
                    res.send(err);
                } else {
                    foundPost.comments.push(createdComment);
                    foundPost.commentCount = foundPost.commentCount+1;
                    foundPost.save();
                    //console.log(createdComment);
                    res.json({
                        created: true,
                        message: "Successfully created Comment.",
                        id: createdComment._id
                    });
                }
            });
        }
    });
});

// COMMENT DELETE ROUTE - Deletes a comment
router.delete("/:commentId", (req, res) => {
    Comment.findByIdAndDelete(req.params.commentId, (err) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            Post.findById(req.params.postId, (err, foundPost) => {
                if(err) {
                    console.log("Error retrieving Post.")
                    console.log(err);
                } else {
                    foundPost.commentCount = foundPost.commentCount-1;
                    foundPost.save();
                    res.json({
                        deleted: true,
                    });
                }
            });
        }
    });
});