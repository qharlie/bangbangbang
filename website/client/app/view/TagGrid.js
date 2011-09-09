/**
 * User: charlie
 * Date: 8/24/11
 * Time: 5:00 PM
 */


Ext.define('Bang.view.TagGrid', {
    extend: 'Ext.grid.Panel',
    title: 'Tags',
    alias: 'widget.tagGrid',

    constructor: function ( config )
    {
        this.reportId = config.reportId;
        this.bangTag = config.bangTag;


        this.callParent(arguments);
    },


    initComponent: function () {

        var me = this;

        this.columns = [
            {
                //id: 'title', // id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })
                header: "Comment",
                dataIndex: 'comment',
                sortable: true,
                flex: 1,
                renderer: function (value, meta, record) {
                    return "<div class='tagColumn'>&nbsp;" + value + "</div>";
                }

            },
            {
                header: 'File',
                dataIndex: 'fileName',
                flex: .5,
                renderer: function (value, meta, record) {
                    return "<div class='fileColumn'>&nbsp;" + value + "</div>";
                }


            },
            {
                header: "Line Number",
                dataIndex: 'lineNumber',
                sortable: true,
                renderer: function (value, meta, record) {
                    return "<div class='lineColumn'>&nbsp;" + value + "</div>";
                }


            },
            {
                header: "Priority",
                dataIndex: 'priority',
                sortable: true,
                renderer: function (value, meta, record) {
                    var cls = 'noPriorityColumn';


                    cls = getGridClassForPriority(value, cls);
                    return "<div class='" + cls + "'>&nbsp;" + value + "</div>";
                }
            },
        ];

        this.store = Ext.create('Ext.data.Store', {
            pageSize: 100,
            fields: [
                'comment','fileName','lineNumber','priority'
            ],
            storeId: 'tagReportStore',
            autoLoad: true,
            proxy: {

                type: 'jsonp',
                url: 'bangapi/report/getIssues',
                extraParams: { reportId: me.reportId, bangTag: me.bangTag },
                reader: {
                    root: 'data',
                    totalProperty: 'total'
                },
                listeners: {

//                    exception: exceptionHandler
                }
            },

            listeners:
            {

                load: function ( store, records, successful, operation, options )
                {
                    var averageCount = 0;
                    var totalPriority = 0;
                    for ( var i = 0; i < records.length;i++ )
                    {
                        var priority = parseInt(records[i].data.priority);
                        if ( priority > 0 )
                        {

                            totalPriority += priority;
                            averageCount++;
                        }

                    }

                    if ( averageCount > 0 )
                    {
                        var averagePriority = totalPriority / averageCount;
                        var cls = getTitleClassForPriority(averagePriority);
                        var title = me.title;
                        me.setTitle('<span class="' + cls + '">' + title + '</span>');
                        
                    }

                }
//                beforeload: function (ds) {
//
//                    ds.proxy.extraParams = {
//                        reeportId: FormHogAPI.getCache('orgId'),
//
//                    };
//                }
            }

        });


//        this.store = Ext.create('Ext.data.ArrayStore', {
//            // store configs
//            autoDestroy: true,
//            storeId: 'myStore',
//            // reader configs
//            idIndex: 0,
//            fields: [
//                'comment','file','lineNumber','priority'
//            ],
//            data:
//                [
//                    ['#Fix the height to be the width of the screen','client/app/RoleGrid.js','126','7'],
//                    ['#TODO: Fix this to use inheritance #ui #charliedoesntknowextFix the height to be the width of the screen','client/app/view/formdesigner/DesignerPanel.js','7','4'],
//                    ['#Change screens when a template is active #soon #uiFix the height to be the width of the screen','client/app/view/formfiller/FormEditorPanel.js','56','2'],
//                    ['#This isnt used yet, the fields are in place','client/app/view/admin/NewUserDialog.js','1230', undefined],
//                    ['#The honey badger doesnt give a shit','client/app/view/admin/NewUserDialog.js','100', 7],
//                    ['#Oh no you did not do this brad','client/app/view/admin/EdUserDialog.js','45', 1],
//
//                ]
//        });

        this.callParent(arguments);

    }
});


