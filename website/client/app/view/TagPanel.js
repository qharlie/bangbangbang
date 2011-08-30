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
    layout:'accordion',
    height: 100,

    initComponent: function () {

        var items = [];
        var me = this;
        BangAPI.getTags(BangAPI.getCache('reportId'), function (tags) {
            if (tags && tags.length) {

                for (var i = 0; i < tags.length; i++) {

                    me.add(
                        {
                            title: '<img src="resources/images/tag.png" alt=""> <span style="font-family: Courier;font-size: 1.2em;font-weight: bold;">' + tags[i] + '</span>',
                            xtype: 'tagGrid',

                        }
                    );
                }
            }

//            me.items = items;


        });

        me.callParent(arguments);


    }


});