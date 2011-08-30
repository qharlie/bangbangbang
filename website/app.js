/** Include for compilation errors
 *
 *
 */

var bangUtil = require('./server/util/bangUtil.js'),
    baseDao = require('./server/dao/baseDao.js'),
    bangDao = require('./server/dao/bangDao.js'),
    config = require('./server/config.js'),
    url = require('url'),
    sys = require('sys');


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

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

// Routes
app.get('/post/:id', function (req, res) {


});

app.get('/bangapi/:service/:method', function (req, res) {

    processApiRequest(req, res, req.params.service + 'Handler', req.params.method);

});

function processApiRequest(req, res, serviceName, methodName) {


    try {


        var urlParsed = url.parse(req.url, true);
        var parameters = urlParsed.query;

        if (req.body) {
            for (var key in req.body) {
                parameters[key] = req.body[key];
            }
        }


        var serviceHandler = require('./server/handlers/' + serviceName );


        bangUtil.log('Calling ' + serviceName + '.' + methodName);

        eval('serviceHandler.' + methodName)(req, res, parameters);


    } catch (e) {
        bangUtil.log('Fatal error caught ' + e);
        res.send({});
        bangUtil.log(sys.inspect(e));
    }


}
;

app.listen(3001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
