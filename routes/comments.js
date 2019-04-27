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
        text: req.body.comment
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
                    console.log(createdComment);
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