Ext.create('Ext.app.Application', {

    name: 'Bang',
    appFolder: 'app',
    autoCreateViewport: true,

    controllers: [
        'DashboardController',
    ],

    launch: function () {
        
        var parms = Ext.Object.fromQueryString(location.search);


        if ( parms['reportId'])
        {
            BangAPI.setCache('reportId', parms['reportId']);
        }

    }



})