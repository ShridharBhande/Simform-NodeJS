var Express = require('express'),
    BodyParser = require('body-parser'),
    Mongoose = require('mongoose'),
    Morgan = require('morgan'),
    appConfig = require('./config/config'),
    cors = require('cors'),
    path = require('path'),
    tokenInterceptor = require('./services/token-interceptor');

// Setup database
Mongoose.connect('mongodb://localhost:27017/simform-db');

// Mongoose.connect('mongodb://' + appConfig.database.username + ':' + appConfig.database.password + '@' + appConfig.database.host + ':' + appConfig.database.port + '/' + appConfig.database.dbName);
Mongoose.connection;

// Init App
var App = Express();

// Cross origin
App.use(cors());


// BodyParser middleware
// Create application/json parser
App.use(BodyParser.json({limit: '50mb'})); // Set request size

// create application/x-www-form-urlencoded parser
App.use(BodyParser.urlencoded({limit: '50mb', extended: true}));

// Creates server logs
App.use(Morgan('dev'));

App.set('views', __dirname + '/views');
App.set('view engine', 'ejs');

// Token Interceptor
App.use(function (req, res, next) {
    tokenInterceptor.interceptor(req, res, next);
});

// Use the custom routes
require('./routes/index')(App);

// Set port
App.set('port', (process.env.PORT || appConfig[appConfig.server].port));
App.set('host', (process.env.HOST || appConfig[appConfig.server].host));

App.listen(App.get('port'), function () {
    console.log('Server started at ' + App.get('host') + ':' + App.get('port'));
});
