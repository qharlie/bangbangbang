Ext.define('Bang.view.CommentsDialog', {

//    title: 'Test',
    layout: 'vbox',
    center: true,
    extend: 'Ext.window.Window',
    width: 800,
    height: 600,

    constructor: function ( config )
    {

        this.record = config.record;
        this.callParent(arguments);
    },


    initComponent: function (config) {

        var me = this;

        this.commentArea = new Ext.form.field.TextArea({ flex: 1 , cls: 'tagColumn', width: 800 , readOnly: true}  );
        this.commentArea.setValue(this.record.comment);

        this.title =  '<span class="'+ getTitleClassForPriority(this.record.priority) + '">Priority ' + this.record.priority + '</span>';

        this.items =  [ { html: '<span class="fileLineHtml">' + this.record.fileName + ' : ' + this.record.lineNumber + '</span> ', width: 800 }, this.commentArea  ];


        this.callParent(arguments);
    }


});