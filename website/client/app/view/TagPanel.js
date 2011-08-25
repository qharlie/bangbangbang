/**
 * User: charlie
 * Date: 8/24/11
 * Time: 5:20 PM
 */
Ext.define('Bang.view.TagPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Tags',
    region: 'center',
    collapsible: true,
    split: true,
    bodyMargin: "5 5 5 5",
    layout:'accordion',
    defaults: {
        // applied to each contained panel
        bodyStyle: 'padding:15px'
    },

    initComponent: function () {

        this.items = [
            {
                title: '<span style="font-family: Verdana;font-size: 1.5em;">R1</span>',
                html: 'Panel content!'
            },
            {
                title: '<span style="font-family: Verdana;font-size: 1.5em;">mustfix</span>',
                html: 'Panel content!'
            },
            {
                title: '<span style="font-family: Verdana;font-size: 1.5em;">eventually</span>',
                html: 'Panel content!'
            }
        ],

            this.callParent();
    }

});