/**
 * User: charlie
 * Date: 8/24/11
 * Time: 5:00 PM
 */


Ext.define('Bang.view.TagGrid', {
    extend: 'Ext.grid.Panel',
    title: 'Tags',
    id: 'myFormsPanel',




    initComponent: function () {

        this.columns = [
            {
                //id: 'title', // id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })
                header: "Form Name",
                dataIndex: 'title',
                sortable: true,
                flex: 1

            },
            {
                header: 'Creation Date',
                dataIndex: 'dateCreated',
                sortable: true,
                hidden: true
            },
            {
                header: 'Last Access',
                dataIndex: 'dateLastAccessed',
                hidden: true,
                sortable: true
            },
            {
                header: 'Fill Form',
                align: 'center',
                dataIndex: 'fillForm',
                sortable: false,
                renderer: function (value, meta, record) {
                    if (record.get('url')) {
                        return '';
                    }
                    else {
                        return "<div class='fillinFormRow'>&nbsp;" + value + "</div>";
                    }
                }
            },
            {
                header: 'Form Approvals',
                align: 'center',
                dataIndex: 'formApprovals',
                sortable: false,
                renderer: function (value, meta, record) {
                    if (record.get('url')) {
                        return '';
                    }
                    else {
                        return "<div class='formApprovalsRow'>&nbsp;" + value + "</div>";
                    }
                }

            },
            {
                header: 'View',
                align: 'center',
                dataIndex: 'totalViewed',
                sortable: false,
                renderer: function (value, meta, record) {
                    var cls = "viewAllRow";
                    if (record.data.url) {
                        cls = 'go2CustomPage';
                        value = "";
                    }
                    return "<div class='" + cls + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + value + "</div> ";
                }
            },
            {
                header: 'Design',
                align: 'center',
                dataIndex: 'design',
                sortable: false,
                renderer: function (value, meta, record) {
                    if (record.get('url')) {
                        return '';
                    }
                    else {
                        return "<div class='designRow'>&nbsp;" + value + "</div>";
                    }
                }

            },
            {
                header: 'Clear',
                dataIndex: 'clear',
                align: 'center',
                sortable: false,
                renderer: function (value, meta, record) {
                    if (record.get('url')) {
                        return '';
                    }
                    else {
                        return "<div class='clearFormRow'>&nbsp;" + value + "</div>";
                    }
                }
            },
            {
                header: 'Delete',
                dataIndex: 'delete',
                align: 'center',
                sortable: false,
                renderer: function (value, meta, record) {
                    if (record.get('url')) {
                        return '';
                    }
                    else {
                        return "<div class='deleteFormRow'>&nbsp;" + value + "</div>";
                    }
                }

            }
        ];

        this.store = Ext.create('Ext.data.Store', {
            pageSize: 100,
            model: 'FormHog.model.MyForms',
            autoLoad: true,
            proxy: {

                type: 'jsonp',
                url: '/formhogapi/form/getMyFormsInfo',
                reader: {
                    root: 'data',
                    totalProperty: 'total'
                }
            }

        });

        this.callParent(arguments);

    }
});


