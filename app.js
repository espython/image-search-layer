var express = require('express');
var BodyParser = require('body-parser');
var Corse = require('cors');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var Bing = require('node-bing-api')({ accKey: "3ec8d197236f4f9fba87b07d7c6506df" });

const app = express()

app.get('/', function(req, res) {
    //res.send('Hello World!')
    Bing.images("Ninja Turtles", { count: 5, market: 'es-ES' }, function(error, body) {

        //var json = JSON.parse(body);
        console.log(body);
        res.json(body);

    });
    //res.send('hello ninja');


});
//res.send(JSON.stringify(data));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})