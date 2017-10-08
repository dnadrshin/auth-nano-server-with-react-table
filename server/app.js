const
    express = require('express'),
    app = express(),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('cookie-session'),
    cookieParser = require('cookie-parser');
    //middlewares = require('./middleware');

app.set('title', 'Chat')

app.use(express.static('public'));

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));

//app.all('/admin', middlewares.mustAuthenticated);

module.exports = app
