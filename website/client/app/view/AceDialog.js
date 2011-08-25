/**
 * User: charlie
 * Date: 8/24/11
 * Time: 9:04 PM
 */

Ext.require([
    'Ext.window.Window',
    'Ext.ux.AceEditor'
]);

Ext.define('Bang.view.AceDialog', {
    extend: 'Ext.window.Window',
    title: 'I Love You.',

    width: 850,
    height: 400,
    layout: "fit",

    initComponent: function ()
    {

        this.ace = new Ext.ux.AceEditor();

        var code = '#!/usr/bin/python\n' +
        '' +
        'import os, sys, fileinput, re, collections\n' +
        '' +
        'def listFiles(rootDir, suffix):\n' +
        '\n\tfileList = []' +
        '\n\tfor root, subFolders, files in os.walk(rootDir):' +
        '\n\t\tfor file in files:' +
        '\n\t\t\tif file.endswith(suffix):' +
        '\n\t\t\t\tfileList.append(os.path.join(root,file))' +
        '\n\treturn fileList;';












        this.ace.setValue(code, { mode: 'python' } );
        this.items = [ this.ace ];

        this.callParent(arguments);
    }


});