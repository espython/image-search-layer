var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    name: String,
    url: String,
    discription: String
});

var Images = mongoose.model('Images', imageSchema);

module.exports = Images;