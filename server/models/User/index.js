const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('tracker');

const User = new Schema({
    username: String,
    password: String,
    role: String,
    created_at: Date,
    last: Date,
    birthdate: Date,
});

User.plugin(passportLocalMongoose, {
    limitAttempts: true,
});

module.exports = mongoose.model('User', User);