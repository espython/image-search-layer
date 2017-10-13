var express = require('express');
var bodyParser = require('body-parser');
var Corse = require('cors');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var Images = require('./models/data');
var Bing = require('node-bing-api')({ accKey: "3ec8d197236f4f9fba87b07d7c6506df" });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://127.0.0.1:27017/imageData');


var imageSearch = new Images({
    name: "nice cat",
    url: "http://url",
    description: "awesome photo"
});
imageSearch.save(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Data has been saved");
    }
})

app.get('/api/imagesearch/:image*', function(req, res) {
    var image = req.params;
    var offset = req.query;
    console.log(image.image);
    //res.send('Hello World!')
    Bing.images(image.image, {
        count: 10,
        offset: 5
    }, function(error, body) {

        //var json = JSON.parse(body);

        res.json(body);

    });
    //res.send('hello ninja');


});
//res.send(JSON.stringify(data));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});