// I'd prefer to tell IE to fuck off and just use dnode, but ... whatever, I'm mimicking a dnode like setup in case it
// ever supports IE

var BangAPI =
{

    getHistory: function (callback) {
        this.jsonp('bangapi/report/getHistory', { bangId: BangAPI.getBangId() }, function (data) {
            if (callback) callback(data);
        });
    },

    getTags: function (reportId, callback) {

        this.jsonp('bangapi/report/getTags', { reportId: reportId }, function (data) {
            if (callback) callback(data);
        });

    },

    updateReportOwner: function (reportId, bangId) {
        this.jsonp('bangapi/report/updateReportOwner', { reportId: reportId , bangId: bangId }, function () {

        });
    },

    jsonp: function (url, parameters, callback) {

        JSONP.get(url, parameters, function (data) {
            if (data && 'succeeded' in data && !data.succeeded) {

                Ext.Msg.alert('Oops!', 'You broke it!');
            }
            else if (callback) callback(data);

        });

    },

    getCache: function (key) {


        return $.jStorage.get(key);
    } ,


    setCache: function (key, value) {
        $.jStorage.set(key, value);
    },

    getBangId: function () {
        var bangId = this.getCache('bangId');
        if (!bangId) {
            bangId = this.generateBangId();
            this.setCache('bangId', bangId);
        }
        return bangId;
    },

    generateBangId: function () {
        return Math.random().toString().substr(2);
    }





};

// GOD DAMN IE
function trace(str) {
    try {
        console.log(str);
    }
    catch (e) {
    }
}