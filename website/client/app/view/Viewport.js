Ext.define('Bang.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    renderTo: 'bang-div',
    id: 'viewport',


    requires: [
        'Bang.view.TagGrid',
        'Bang.view.TagPanel',
        'Bang.view.HistoryPanel',
        'Bang.view.North',
        

    ],

    initComponent: function() {

        this.left = new Bang.view.HistoryPanel();
        this.center = new Bang.view.TagPanel();
        this.north = new Bang.view.North();

        this.items = [
            this.left,
            this.center,
            this.north

        ];

        
        this.callParent(arguments);
    }
});