/**
 * User: charlie
 * Date: 8/24/11
 * Time: 5:10 PM
 */

Ext.define("Bang.view.North", {
    extend: 'Ext.container.Container',

    region: 'north',
    id: 'northPanel',
    alias: 'widget.north',
    height: 50,
    frame: false,
    bodyPadding: 5,
    bodyBorder: false,
    preventHeader: true,
    layout: 'hbox',

    html: '<p align="center">BANG!</p>'
});
