global.Backbone = require('backbone');
global.$ = require('jquery');
// require('../vendor/js/handlebars');

global.Handlebars = require('hbsfy/runtime');
// global.Handlebars = require('handlebars');
var registerHandlebarsComponents = require('../../config/registerHandlebarsComponents');
// require('../vendor/js/secure-handlebars-helpers');
registerHandlebarsComponents(global.Handlebars);

var $ = global.$;

var LibraryView = require('./views/library');
$(function() {
    var books = [
        { title: 'JavaScript: The Good Parts<script>alert("title")</script>', author: 'Douglas Crockford', releaseDate: '2008', 
            keywords: 'JavaScript Programming', url: 'javascript:alert(666)', name:'a" data-pdts="b"', someString: '<script>alert(0);</script>', 
            titleLink: 'javascript: alert(0)', authorLink: 'a> cd' },
        { title: 'The Little Book on CoffeeScript', author: 'Alex MacCaw', releaseDate: '2012', keywords: 'CoffeeScript Programming', url: 'www.google.com' },
        { title: 'Scala for the Impatient', author: 'Cay S. Horstmann', releaseDate: '2012', keywords: 'Scala Programming', url: 'https://developer.visa.com' },
        { title: 'American Psycho', author: 'Bret Easton Ellis', releaseDate: '1991', keywords: 'Novel Splatter' },
        { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', releaseDate: '2011', keywords: 'JavaScript Programming' }
    ];

    new LibraryView( books );       
});

