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

    html:
        '<img src="resources/images/logo.png" alt="" style="margin-top: .2em;">' +
            '<span align="center" style="font-family: Courier;font-size: 2em;font-weight: bold;">BANG.' +
            ' <span style="font-size: .5em;font-weight: normal;">an easy way to track what needs to be done.' +
            '</span>' +
            '</span>'
});
