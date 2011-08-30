var log = require('logging'),
    fs = require('fs'),
    config = require('../config.js');

var Util =
{
    /**
     * log function, colors the output for production, or change it to whatever youy want.
     */
    log: function () {
        if (config.debug) { // debug mode
            //console.log(arguments);
            log(arguments);
        }
    },

    pify: function (parameters, payload) {
        return parameters.callback + "( " + JSON.stringify(payload) + ")";
    },

    p: function ( res, parameters, payload)
    {
        res.send(this.pify(parameters, payload));
    }

};

module.exports = Util;