var hbsTemplate = require('../templates/book.hbs');
var xssTemplate = require('../templates/xssTemplate.hbs');
// var Handlebars = require('handlebars');
var Backbone = global.Backbone;
var _ = require('lodash');
var xssFilters = require('xss-filters');

var getStr = {
    getString: function getString(str) {
        return str;
    }
};


module.exports = Backbone.View.extend({
    tagName: 'div',
    // className: 'bookContainer',
    // template: _.template($('#bookTemplate').html()),
    // hbsTemplate: Handlebars.compile(hbsTemplate),
    hbsTemplate: hbsTemplate,
    xssTemplate: xssTemplate,

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        // this.$el.html( this.template( this.model.attributes ) );
        var attr = _.merge(this.model.attributes, {xssFilters: xssFilters, uriInDoubleQuot: xssFilters.uriComponentInDoubleQuotedAttr, getStr: getStr});
        // this.$el.html(this.hbsTemplate(attr)).append("<script>alert('Good mrng')</script>");
        this.$el.html(this.hbsTemplate(attr)).append(this.xssTemplate({name: "<script>alert('Good mrng')</script>"}));
        // this.$el.html(this.hbsTemplate(attr)).append(this.xssTemplate({name: '<img src=x onerror=prompt("XSSED")>'}));
        return this;
    }
});