// I'd prefer to tell IE to fuck off and just use dnode, but ... whatever, I'm mimicking a dnode like setup in case it
// ever supports IE

var BangAPI =
{

    getTags: function (reportId, callback) {

        this.jsonp('bangapi/report/getTags', { reportId: reportId }, function (data) {
            if (callback) callback(data);
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

    getCache: function (key, skipDecode) {

        var val = Ext.util.Cookies.get(key);
        if (skipDecode)
            return val;
        else return Ext.decode(val);
        //return $.jStorage.get(key);
    } ,


    setCache: function (key, value, skipEncode) {
        if (!skipEncode)
            value = Ext.encode(value)
        Ext.util.Cookies.set(key, value, null, null, config.domain);

    },




};

// GOD DAMN IE
function trace(str) {
    try {
        console.log(str);
    }
    catch (e) {
    }
}