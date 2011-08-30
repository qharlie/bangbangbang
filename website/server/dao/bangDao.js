var config = require('../config'),
    BaseDao = require('./baseDao'),
    Class = require('simple-class').Class;

/**
 * @class Handles the 'template' collection
 */
var TemplateDao = BaseDao.extend({

    init: function () {
        this._super(config.databaseHost, config.databasePort, config.databaseName, 'reports');
    }

});

module.exports = new TemplateDao();