const express = require('express');
// 			expressSession = require('express-session'),
// 			cookieParser = require('cookie-parser'),
// 			mongoose    = require("mongoose"),
// 			passport = require("passport"),
// 			LocalStrategy = require("passport-local"),
// 			bodyParser = require('body-parser'),
// 			models = require('./models');

const PORT = process.env.PORT || 5000;
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(expressSession(({
// 	secret: 'This is not a reddit clone',
// 	resave: false,
// 	saveUninitialized: true,
// })));
// app.use(passport.initialize());
// app.use(passport.session());

// Load routes
const routes = require('./routes');
app.use(routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`)
  });