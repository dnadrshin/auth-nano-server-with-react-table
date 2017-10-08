const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('tracker');

const Record = new Schema({
    date: Date,
    distance: Number,
    time: String,
    created_at: Date,
    last: Date,
});

Record.plugin(passportLocalMongoose, {
    limitAttempts: true,
});

module.exports = mongoose.model('Record', Record);