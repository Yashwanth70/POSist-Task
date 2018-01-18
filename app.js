var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var mongoose = require('./app/models');
var secrets = require('./configs/secrets')['development'];

var app = express();

app.set('superSecret', 'secrets.jwt'); // secret variable


var apiRoutes = express.Router();

app.use(bodyParser.json());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
}));


/* *
    This will allow to CORS 
*/
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(morgan('dev'));
app.disable('etag');

app.use(express.static(__dirname + '/public'));

var routes = require("./app/routes")(app, apiRoutes);

app.listen(3000, function() {
    console.log('Angular Full Stack listening on port ' + 3000);
});