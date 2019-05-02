const mongoose = require("mongoose");
const User = require('./models/user'),
			Board = require('./models/board'),
			Post = require('./models/post'),
            Comment = require('./models/comment');
            
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// First delete all data (comments, posts, boards)
// Then seed new data
function seedDB() {
    console.log("Clearing DB. \nRemoving all Comments.");
    // Remove all comments
    Comment.deleteMany({}, (err) => {
        if(err) { 
            console.log("Could not remove comments.");
            console.log(err);
        } else {
            // Remove all posts
            console.log("All comments removed. \nRemoving all Posts.");
            Post.deleteMany({}, () => {
                if(err) { 
                    console.log("Could not remove posts.");
                    console.log(err);
                } else {
                    // Remove all boards
                    console.log("All posts removed. \nRemoving all Boards.");
                    Board.deleteMany({}, () => {
                        if(err) { 
                            console.log("Could not remove posts.");
                            console.log(err);
                        } else {
                            console.log("All Boards removed.");
                            fillDB();
                        }
                    });
                }
            });
        }
    });
};

let sampleBoards = [
    {
        name: "technology",
        title: "Technology",
        image: "https://spectrum.ieee.org/image/MzEwMTk5OA.jpeg",
        description: "A place for technology enthusiasts interested in the latest innovations."
    },
    {
        name: "gaming",
        title: "Gaming",
        image: "https://s17189.pcdn.co/blog/wp-content/uploads/2018/04/jeshoots-com-250229-unsplash-1060x540.jpg",
        description: "Let's discuss all things gaming!"
    },
    {
        name: "movies",
        title: "Movies",
        image: "http://pluspng.com/img-png/movie-reel-png-movie-reel-silhouette-film-reel-png-filmreel-e1364616592886-jpg-4455.jpg",
        description: "Talk about movies from the classics to the latest blockbusters."
    },
    {
        name: "news",
        title: "News",
        image: "https://www.hplibrary.org/sites/default/files/news.png.jpg",
        description: "What's going on in the world?"
    },
    {
        name: "sports",
        title: "Sports",
        image: "https://www.thinkwy.org/wp-content/uploads/2017/10/hpfulq-1234.jpg",
        description: "Talk about sports here."
    },
    {
        name: "science",
        title: "Science",
        image: "http://highlandfling.helixcharter.net/wp-content/uploads/2019/04/science-onward-journey_v3.png",
        description: "Post about interesting discoveries and new advancements."
    }
]

let samplePosts = [

]

function fillDB() {
    console.log("Filling DB!!!");
    sampleBoards.forEach((seed) => {
        Board.create(seed, (err, createdBoard) => {
            if(err) {
                console.log(err);
            } else {
                //console.log("Successfully created Board: " + createdBoard);
                createdBoard.save();
            }
        });
    });
};

module.exports = seedDB;