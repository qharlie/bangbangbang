
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration


//Load Application built in configuration stuff
app.configure(function () {
    app.use(express.methodOverride());
    app.use(express.bodyParser());

    app.use(express.cookieParser());


    app.use(app.router);
    app.use(express.static(__dirname + '/client'));

    app.set('views', __dirname + "/");
    app.set('view engine', 'ejs');
    app.register('.html', require('ejs'));

    // subdomain names should retrieve from templates collection with url fields
//    app.use(express.vhost('nis.formhogv2.com', require('./modules/nis/app.js').app));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.listen(3001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
