
var config = require('../config.js');

/**
 * @class A Data utility class that handles building queries for mongo
 */
var DataUtil = {

    /**
     * This function builds a document for use with our DAO's based on the Ext parameters sent in from the grid.
     * @param parameters , parameters.sort ( a text field or a list of sort fields, we only use the first sort ), parameters.start, parameters.limit, parameters.dir ( 'DESC' or 'ASC' )
     */
    buildQuery: function (parameters) {

        var sortField = '_id';
        var sortDirection = 'DESC';
        var skip = 0;
        var limit = 1000;
        var direction = 1;


        if (parameters) {
            // This indicates a multi parameter sort, so we just take the first one for now
            // TODO:  Handle all sub sorts
            if (parameters.sort && parameters.sort[0] == '[') {

                var sortDoc = eval("(" + parameters.sort + ")");
                var sortRow = sortDoc[0];
                sortField = sortRow.property || '_id';
                sortDirection = sortRow.direction || 'DESC';
            }
            else {
                sortField = parameters.sort || '_id';
                sortDirection = parameters.dir || 'DESC';
            }

            skip = parameters.start || 0;
            limit = parameters.limit || 1000;
            direction = sortDirection == 'DESC' ? -1 : 1;


        }

        var sort = {};
        sort[sortField] = direction;
        return { sortField: sortField, sortDirection: sortDirection, skip: skip, limit: limit, sort: sort };

    }




};

module.exports = DataUtil;


