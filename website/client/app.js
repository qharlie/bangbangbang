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


function getGridClassForPriority(value, cls) {
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

function getTitleClassForPriority(value, cls) {
    var cls = 'noPriorityTitle';

    if (value && value >= 0) {
        cls = 'lowPriorityTitle';
    }
    if (value && value >= 4) {
        cls = 'mediumPriorityTitle';
    }
    if (value && value >= 7) {
        cls = 'highPriorityTitle';
    }
    return cls;
}