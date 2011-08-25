/**
 * User: charlie
 * Date: 8/24/11
 * Time: 5:00 PM
 */
/**
 * User: Charlie Sanders
 * Date: 7/1/11
 * Time: 8:25 PM
 */


Ext.define('Bang.view.HistoryPanel', {
    extend: 'Ext.panel.Panel',
    title: 'History',
    region: 'west',
    width: 200,
    collapsible: true,
    split: true,
    bodyMargin: "5 5 5 5",
    items:
        [
            { xtype: 'button', text: '21 days ago' , height: 30, width: 170, margin: "5 5 5 5"},
            { xtype: 'button', text: '5 days ago' , height: 30, width: 170, margin: "5 5 5 5"}
        ]
});