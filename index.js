var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.js');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var apiRoutes = require('./server/routes/API');

var app = express();
var compiler = webpack(config);
var settings = require('./server/settings');

app.set('title', 'Tracker');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({keys: ['tracker']}));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.use('/API/', apiRoutes);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Connect mongoose
mongoose.connect(settings.mongodbUrl, err => console.log(err ? 'Could not connect to mongodb!' : 'MongoDB connection established'));
mongoose.set('debug', true);

app.listen(settings.port, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://localhost:${settings.port}`);
});
