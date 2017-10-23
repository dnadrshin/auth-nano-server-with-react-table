const
    path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    config = require('./webpack.js'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('cookie-session'),
    cookieParser = require('cookie-parser'),
    apiRoutes = require('./server/routes/API'),
    app = express(),
    compiler = webpack(config),
    settings = require('./server/settings'),
    prodDB = process.env.NODE_MODULES_DB,
    passportInit = require('./server/passport');

global.__base = path.join(__dirname, '/');

app.set('title', 'Tracker');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({keys: ['tracker']}));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo    : true,
    publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));
app.use('/API', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

passportInit(app);

console.log(prodDB)

mongoose.connect(
    prodDB ? prodDB : settings.mongodbUrl,
    {useMongoClient: true},
    err => console.log(err ? 'Could not connect to mongodb!' : 'MongoDB connection established'),
);

mongoose.set('debug', true);

app.listen(settings.port, (err) => {
    if (err) return console.log(err);
    return console.log(`Listening at http://localhost:${settings.port}`);
});
