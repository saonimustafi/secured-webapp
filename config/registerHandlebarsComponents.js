'use strict';
var xssFilters = require('xss-filters');
module.exports = function registerHandlebarsComponents(Handlebars) {
    
    Handlebars.registerHelper('xssFiltersUriInDoubleQuotedAttr', function (val) {
        if (val) {
            return xssFilters.uriInDoubleQuotedAttr(val);
        }
    });

    Handlebars.registerHelper('getJavascriptAlert', function (val) {
        if (val) {
            return "javascript: alert(val);";
        }
    });

    Handlebars.registerHelper('getString', function (val) {
        if (val) {
            return "javascript: alert(0)";
        }
    });
    
};
