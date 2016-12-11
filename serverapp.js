var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express');

var app = express();

app.use(express.static(__dirname + '/src'));

app.get('*', function(req, res) {
        res.sendfile('./src/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
app.listen( 3002);


