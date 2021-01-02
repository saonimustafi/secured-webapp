var Book = require('../models/book');
var Backbone = global.Backbone; 

module.exports = Backbone.Collection.extend({
    model: Book
});