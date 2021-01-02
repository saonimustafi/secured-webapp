// Module dependencies.
var application_root = __dirname,
    express = require('express'), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require('path'), //Utilities for dealing with file paths
    mongoose = require('mongoose'); //MongoDB integration
var _ = require('lodash');
var sanitize = require('google-caja').sanitize;
var xssFilters = require('xss-filters');
var ejs = require('secure-filters').configure(require('ejs'));


//Create server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// var books = require('./routes/books');

//Where to serve static content
console.log(path.join(application_root, '../', 'front-end'));
console.log(path.join(application_root, 'front-end'));
app.use(express.static(path.join(application_root, 'front-end')));
app.use(bodyParser());

// Routes
app.get('/api', function (request, response) {
    response.send('Library API is running');
});

//Connect to database
mongoose.connect('mongodb://localhost/library_database');

//Schemas
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
});

//Models
var BookModel = mongoose.model('Book', Book);

// Configure server
app.configure(function () {
    //parses request body and populates request.body
    app.use(express.bodyParser());

    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());

    //perform route lookup based on url and HTTP method
    app.use(app.router);

    //Where to serve static content
    app.use(express.static(path.join(application_root, 'front-end')));

    //Show all errors in development
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

//Get a list of all books
app.get('/api/books', function (request, response) {
    return BookModel.find(function (err, books) {
        if (!err) {
            return response.send(books);
        } else {
            return console.log(err);
        }
    });
});

app.use('/xyz/', function (req, res) {
    console.log("Hello");
    console.log("req.url = " + req.url);
    res.send({msg: 'Hello'});
});

function getString() {
    return '"this is a string"';
}

function getObject() {
    return {a: 'b'};
}

var data = {
    name: '<b>Aveek</b><script>alert("XSS in name");</script>',
    age: 24,
    msg: '<div onmouseover="alert(\'onmouseover All is well\')">All is well</div>',
    hrefVal: 'javascript:alert(3);',
    hrefName: '<script>alert("XSS in hrefName");</script>', 
    xssFilters: xssFilters,
    dataAttr: 'xss" data-pdts="xsss"',
    getString: getString,
    getObject: getObject
    // sanitize: sanitize
};
console.log("data Before= " + JSON.stringify(data));
// data = JSON.parse(sanitize(JSON.stringify(data)));
console.log("data After= " + JSON.stringify(data));

data = _.merge(data, {xssFilters: xssFilters});
app.use('/views/', function (req, res) {
    res.render('sampleView.ejs', (data));
});

app.use('/testview/', function (req, res) {
    
});

app.use('/abc', function (req,res) {
   res.status(200).send({msgBody: req.body})
});

app.use('/red', function (req, res) {
    // res.send({msg: "good"});
   // res.redirect("https://google.co.in");
   res.redirect("/guides/https://google.co.in");
    
});

module.exports = app;