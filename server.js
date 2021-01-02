//Start server
var port = 4714;
var app = require('./app');

app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

