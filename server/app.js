const
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('cookie-session'),
    cookieParser = require('cookie-parser');

app.set('title', 'Chat');

app.use(express.static('public'));

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// todo: del unused middleware
app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));

module.exports = app;
