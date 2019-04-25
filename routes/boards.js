// Boards Routes - Appends "/b"
const express = require("express");
const router = express.Router({mergeParams: true});
const Board = require("../models/board");
const Post = require("../models/post");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// INDEX Route - Shows list of all boards
router.get("/", (req, res) => {
    Board.find({}, (err, foundBoards) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                foundBoards
            });
        }
    });
});

// CREATE Route - Adds a new Board to the DB
router.post("/", (req, res) => {
    let newBoard = {
        name: req.body.boardName,
        title: req.body.boardTitle,
        image: req.body.boardImage,
        description: req.body.boardDescription
    };  

    Board.create(newBoard, (err, createdBoard) => {
        if(err){
            if(err.code == 11000) {
                res.json({
                    created: false,
                    message: "Error: Board with name \"" + req.body.boardName + "\" already exists.",
                });
            } else {
                console.log(err);
            res.send(err);
            }
        } else {
            res.json({
                created: true,
                message: "Successfully created Board with name: " + createdBoard.name,
            });
        }
    });
});

// SHOW Route - Display page for a specific Board
router.get("/:boardName", (req, res) => {
    Board.findOne({name: req.params.boardName}).populate("posts").exec(
        (err, foundBoard) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({
                foundBoard
            });
        }
    });
});

// UPDATE Route - Updates Board information
router.put("/:boardName", (req, res) => {
    let editBoard = {
        title: req.body.boardTitle,
        image: req.body.boardImage,
        description: req.body.boardDescription
    };
    Board.findOneAndUpdate({name: req.params.boardName}, editBoard, (err, updatedBoard) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            //console.log(updatedBoard);
            res.json({
                edited: true,
            });
        }
    });
});

// DESTROY Route - Deletes Board and all its associated posts, 
//                  and the posts' associated comments
router.delete("/:boardName", (req, res) => {
    Board.findOneAndDelete({name: req.params.boardName}, (err) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            //console.log(updatedBoard);
            res.json({
                deleted: true,
            });
        }
    });
});


module.exports = router;