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


app.get('/api/recentSearch', function(req, res, next) {
    Images.find({}, function(error, data) {
        res.json(data);
    })
})

app.get('/api/imagesearch/:searchVal*', function(req, res) {
    var { searchVal } = req.params;
    //var offset = req.query;
    var imageSearch = new Images({
        searchVal: searchVal,
        searchDate: new Date()
    });
    imageSearch.save(function(err) {
        if (err) {
            throw err;
        } else {
            console.log("Data has been saved");
        }
    });
    console.log(searchVal);
    //res.send('Hello World!')
    Bing.images(searchVal, {
        count: 10,
        offset: 3
    }, function(error, rez, body) {

        var dataArray = [];
        for (var i = 0; i < 10; i++) {
            dataArray.push({
                url: body.value[i].webSearchUrl,
                snippet: body.value[i].name,
                thumbnail: body.value[i].thumbnailUrl,
                context: body.value[i].hostPageDisplayUrl
            });
        }

        res.json(dataArray);

    });
    //res.send('hello ninja');


});
//res.send(JSON.stringify(data));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});