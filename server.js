// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var jwt        = require("jsonwebtoken");
var morgan     = require("morgan");
var cors       = require("cors");

var port = process.env.PORT || 8080;        // set our port
var config = require('./config');
var env = process.env.NODE_ENV || 'development'

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan("dev"));

app.use(cors());

// our secret to encode and decode authentication tokens
app.set("superSecret", config.authentication.secret);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// MODELS
// =============================================================================
var models = require("./models");
var userHelper = require("./models/helpers/user.js")(models.User);

// REGISTER OUR ROUTES -------------------------------
// =============================================================================

// authentication api
app.use('/api/auth/steam', require("./api/authenticate")(userHelper, config.host[env].host));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// authorization middleware (will not allow any of the following apis if a token is not provided)
app.use(require("./api/protector"));

// users api
app.use("/api/users", require("./api/users")(userHelper));

// START THE SERVER
// =============================================================================
models.sequelize.sync().then(function () {
  var server = app.listen(port);
});
