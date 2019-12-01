// import express framework module
var express = require('express');

// import consign module
var consign = require('consign');

// import body-parser module
var bodyParser = require('body-parser');

// import express-validator module
var expressValidator = require('express-validator');

// import validator module
var validator = require('validator');

// initiate express object
var app = express();

// setting chatParticipants,'view engine' and express 'views' variables
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.set('chatParticipants',[]);

// configure express.static middleware
app.use(express.static('./app/public'));

// configure body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// configure express-validator middleware
app.use(expressValidator());

// routes, models and controllers autoloading to app object
consign()
    .include('./app/routes')
    .then('./app/models')
    .then('./app/controllers')
    .into(app);

// export app object
module.exports = app;