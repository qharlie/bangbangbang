/**
 * Created by JetBrains PhpStorm.
 * User: qbert
 * Date: 7/15/11
 * Time: 12:56 PM
 * To change this template use File | Settings | File Templates.
 */

var fhUtil = require('../util/bangUtil.js'),
    dataUtil = require('../util/dataUtil.js'),
    Mongolian = require('mongolian'),
    Class = require('simple-class').Class;

/**
 * @class BaseDao that most all DAO's extend from
 */
var BaseDao = Class.extend({

    /**
     * Base constructor, subclasses need to pass in there connection details
     *
     * @memberOf BaseDao
     * @param databaseHost
     * @param databasePort
     * @param databaseName
     * @param collectionName
     */
    init: function (databaseHost, databasePort, databaseName, collectionName) {
        this.server = new Mongolian({ host: databaseHost, port: databasePort});
        this.databaseName = databaseName;
        this.db = this.server.db(databaseName);
        this.collectionName = collectionName;
        this.collection = this.db.collection(collectionName);
    },

    /**
     * the find function that searches the base dao collection.
     *
     * @memberOf BaseDao
     * @param criteria mongo criteria
     * @param parameters parameters that come from ext js grids.  start, limit, sort ( a text string of the field to sort on, or an array ), and dir for direction (ASC or DESC )
     * @param callback
     */
    find: function (criteria, parameters, callback) {
        var self = this;

        var builtQuery = dataUtil.buildQuery(parameters);

        fhUtil.log('BaseDao Searching ' + this.databaseName + '.' + this.collectionName + ' with ', criteria, builtQuery.skip, builtQuery.sort, builtQuery.limit);

        this.collection.find(criteria).skip(builtQuery.skip).sort(builtQuery.sort).limit(builtQuery.limit).toArray(function (err, value) {

            if (err) {
                fhUtil.log('Error occured fetching users', err);
                if (callback) callback(false);
            }
            else {
                if (callback) callback(value);
            }
        });
    },

    /**
     * Just like find except returns only one element.
     *
     * @memberOf BaseDao
     * @param criteria
     * @param callback
     */
    findOne: function (criteria, callback) {

        this.find(criteria, {} , function (things) {
            
            if (things.length) {
                callback(things[0]);
            }
            else callback(false);
        });
    },
    /**
     * Inserts a new data, or update it if data has an _id
     *
     * @memberOf BaseDao
     * @param data
     * @param callback
     */
    upsert: function (data, callback) {

        fhUtil.log('BaseDao Upserting ' + this.collectionName + ' with ', data);


        this.collection.save(data, function (err, value) {
            if (err) {
                fhUtil.log('Error occurred upserting orgs', err);
                if (callback) callback(false);
            }
            else {
                
                if (callback && value ) callback(value._id);
                else if ( callback ) callback(true);
            }
        });
    },

    /**
     * Rremoves criteria from db
     *
     * @memberOf BaseDao
     * @param criteria mongo criteria
     * @param callback
     */
    remove: function(criteria, callback) {

        fhUtil.log('Removing from ' + this.collectionName + ' with ', criteria);

        this.collection.remove(criteria, function (err, value) {
            if (err) {
                fhUtil.log('Error occured removing ', criteria, err);
                if (callback) callback();
            }
            else if (callback) callback(true);
        });
    }




});

module.exports = BaseDao;
