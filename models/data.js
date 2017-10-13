var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    searchVal: String,
    searchDate: Date
}, { timestamps: true });

var Images = mongoose.model('Images', imageSchema);

module.exports = Images;