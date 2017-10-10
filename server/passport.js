const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
    // Configure passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Configure passport-local to use account model for authentication
    const User = require('./models/User');
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}
