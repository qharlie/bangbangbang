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

        this.items = [
            {
                title: '<img src="resources/images/tag.png" alt=""> <span style="font-family: Courier;font-size: 1.2em;font-weight: bold;">r1</span>',
                xtype: 'tagGrid',

            },
            {
                title: '<img src="resources/images/tag.png" alt=""> <span style="font-family: Courier;font-size: 1.2em;font-weight: bold;">mustfix</span>',
                xtype: 'tagGrid'
            },
            {
                title: '<img src="resources/images/tag.png" alt=""> <span style="font-family: Courier;font-size: 1.2em;font-weight: bold;">eventually</span>',
                xtype: 'tagGrid'
            },
            {
                title: '<img src="resources/images/tag.png" alt=""> <span style="font-family: Courier;font-size: 1.2em;font-weight: bold;">soon</span>',
                xtype: 'tagGrid'
            }
            ,
            {
                title: '<img src="resources/images/tag.png" alt=""> <span style="font-family: Courier;font-size: 1.2em;font-weight: bold;">charliedoesntknowext</span>',
                xtype: 'tagGrid'
            }
        ];

        this.callParent(arguments);
    },

    beforeShow: function () {

        alert('here');
        this.items.itemAt(2).expand();
        this.callParent(arguments);
    },

});