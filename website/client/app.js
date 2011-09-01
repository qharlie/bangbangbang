Ext.create('Ext.app.Application', {

    name: 'Bang',
    appFolder: 'app',
    autoCreateViewport: true,

    controllers: [
        'DashboardController',
    ],

    launch: function () {


    }



})


function getClassForPriority(value, cls) {
    var cls = 'noPriorityColumn';
    
    if (value && value >= 0) {
        cls = 'lowPriorityColumn';
    }
    if (value && value >= 4) {
        cls = 'mediumPriorityColumn';
    }
    if (value && value >= 7) {
        cls = 'highPriorityColumn';
    }
    return cls;
}