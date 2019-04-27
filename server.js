// Import Packages
const express = require('express');
			expressSession = require('express-session'),
			cookieParser = require('cookie-parser'),
			mongoose    = require("mongoose"),
			passport = require("passport"),
			LocalStrategy = require("passport-local"),
			bodyParser = require('body-parser')
			cors = require('cors');

// Import Models
const User = require('./models/user'),
			Board = require('./models/board'),
			Post = require('./models/post'),
			Comment = require('./models/comment');

// Import Routes
const authRoutes = require('./routes/auth'),
			indexRoutes = require('./routes/index'),
			boardsRoutes = require('./routes/boards'),
			postsRoutes = require('./routes/posts'),
			commentsRoutes = require('./routes/comments');

const seedDB = require('./seed');

const PORT = process.env.PORT || 5000;
const app = express();

// Mongoose Config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/postrdb", 
	(err) => {
		if (err) throw err;
		 console.log('Successfully connected to mongodb');
		 //seedDB();
});

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Passport Config
app.use(expressSession(({
	secret: 'Recyclable cardboard',
	resave: false,
	saveUninitialized: false,
})));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set current user
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// Use routes
app.use("/api/", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/b", boardsRoutes);
app.use("/api/b/:boardName", postsRoutes);
app.use("/api/b/:boardName/:postId", commentsRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`)
  });