const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Record = new Schema({
    date      : Date,
    userId    : String,
    distance  : Number,
    time      : String,
    created_at: Date,
    last      : Date,
});

module.exports = mongoose.model('Record', Record);
