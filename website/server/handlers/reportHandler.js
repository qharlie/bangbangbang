var config = require('../config'),
    Class = require('simple-class').Class,
    bangUtil = require('../util/bangUtil.js'),
    reportDao = require('../dao/bangDao.js'),
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


        reportDao.findOne({_id: new ObjectId(reportId)}, function (report) {
            var tagList = [];


            if (report && report.tags) {

                for (var key in report.tags) {
                    console.log(key);
                    tagList.push(key);
                }
            }


            tagList.sort();


            bangUtil.p(res, parameters, tagList);
        });


    },

    updateReportOwner: function (req, res, parameters) {
        bangUtil.log("Handling updateReportOwner with ", parameters);
        var reportId = parameters.reportId;
        var bangId = parameters.bangId;

        reportDao.findOne({_id: new ObjectId(reportId)}, function (report) {

            if (!report.bangId) {
                report.bangId = bangId;
                reportDao.upsert(report);
            }

        });

        bangUtil.p(res, parameters, {});

    },

    getHistory: function (req, res, parameters) {
        var bangId = parameters.bangId;
        bangUtil.log("Handling getHistory", parameters);

        var results = [];

        reportDao.find({bangId: bangId}, {project: 1}, function (reports) {
            if (reports && reports.length) {

                for (var i = 0; i < reports.length; i++) {
                    var report = reports[i];

                    results.push({reportId: report._id, project: report.project, createdOn: report.createdOn });
                }

            }
            bangUtil.p(res, parameters, results);
        });

    },

    getIssues: function (req, res, parameters) {
        bangUtil.log("Handling getIssues", parameters);

        var reportId = parameters.reportId;
        var bangTag = parameters.bangTag;

        var tagList = [];

        reportDao.findOne({_id: new ObjectId(reportId)}, function (report) {


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

    saveReport: function (req, res, parameters) {
        var report = eval("(" + parameters.report + ")");
        reportDao.upsert({tags: report.tags, project: report.project, createdOn: new Date()  }, function (id) {
            res.send(config.reportHost + "/?reportId=" + id);
        });
    }

});

module.exports = new ReportHandler();
