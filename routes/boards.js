// Boards Routes - Appends "/b"
const express = require("express");
const router = express.Router({mergeParams: true});
const Board = require("../models/board");
const Post = require("../models/post");
const middleware = require("../middleware");

// INDEX Route - Shows list of all boards
router.get("/", (req, res) => {
    res.send("Showing list of all boards.");
});

// NEW Route - Shows form to create a new Board
router.get("/new", (req, res) => {
    res.send("This is the new Board form.");
});

// CREATE Route - Adds a new Board to the DB
router.post("/", (req, res) => {
    // Create Board object
    // Save it to DB
});

// SHOW Route - Display page for a specific Board
router.get("/:boardName", (req, res) => {
    res.send("Viewing all posts for Board: " + req.params.boardName);
});

// EDIT Route - Shows form to edit Board information
router.get("/:boardName/edit", (req, res) => {
    res.send("Now editing: " + req.params.boardName);
});

// UPDATE Route - Updates Board information
router.put("/:boardname", (req, res) => {
    // Updates info
});

// DESTROY Route - Deletes Board and all its associated posts, 
//                  and the posts' associated comments
router.delete("/:boardName", (req, res) => {
    // Find board in DB, delete it
});


module.exports = router;