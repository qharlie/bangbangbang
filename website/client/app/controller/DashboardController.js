Ext.define('Bang.controller.DashboardController', {
    extend: 'Ext.app.Controller',

    views: [
    ],

    refs: [
    ],

    init: function () {
        this.control({

            'viewport tagGrid':
            {
                itemdblclick: function (view, record, item, rowIndex, e) {
                    var ace = new Bang.view.AceDialog();
                    ace.show();
                }
            },
        });

    },


});