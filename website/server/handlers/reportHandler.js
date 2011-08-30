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


    },

    getIssues: function (req, res, parameters) {
        bangUtil.log("Handling getIssues", parameters);

        var reportId = parameters.reportId;
        var bangTag = parameters.bangTag;

        var tagList = [];

        bangDao.findOne({_id: new ObjectId(reportId)}, function (report) {

            if (report.tags && report.tags[bangTag]) {
                for (var i = 0; i < report.tags[bangTag].length; i++) {
                    var line = report.tags[bangTag][i];
                    delete line['fileContents'];
                    tagList.push(line);
                }
            }

            bangUtil.p(res, parameters, tagList);
        });

    },

    saveReport: function ( req, res, parameters)
    {

        bangUtil.log('SAVING!', parameters);
    }

});

module.exports = new ReportHandler();