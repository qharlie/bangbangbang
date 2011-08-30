var config = require('../config'),
    Class = require('simple-class').Class,
    bangUtil = require('../util/bangUtil.js'),
    bangDao = require('../dao/bangDao.js'),
    ObjectId = require('mongolian').ObjectId;


/**
 * @class Handles the 'template' collection
 */

ReportHandler = Class.extend({

    init: function () {

    },

    getTags: function (req, res, parameters) {
        bangUtil.log("Handling getTags", parameters);

        var reportId = parameters.reportId;


        bangDao.findOne({_id: new ObjectId(reportId)}, function (report) {
            var tagList = [];


            if (report && report.tags) {

                for (var key in report.tags) {
                    tagList.push(key);
                }
            }

            tagList.sort();

            bangUtil.p(res, parameters, tagList);
        });


    }

});

module.exports = new ReportHandler();