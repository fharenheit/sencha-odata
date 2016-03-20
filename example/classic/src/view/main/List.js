/**
 * This view is an example list of people.
 */
Ext.define('MyApp.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'Ext.form.field.Text',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Spacer',
        'MyApp.store.People'
    ],

    title: 'Read, Create, Update, Delete and Query Sample',
    glyph: 'xf1c0@FontAwesome',

    reference: 'mainlist',

    store: {
        type: 'people'
    },

    frame: true,

    selModel: 'cellmodel',

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    columns: [
        {text: 'FirstName', dataIndex: 'FirstName', flex: 1, editor: 'textfield'},
        {text: 'LastName', dataIndex: 'LastName', flex: 1, editor: 'textfield'},
        {text: 'Gender', dataIndex: 'Gender', flex: 1, editor: 'textfield'},
        {
            xtype: 'actioncolumn',
            width: 30,
            sortable: false,
            menuDisabled: true,
            items: [{
                iconCls: 'cell-editing-delete-row',
                handler: 'onRemoveClick'
            }]
        }
    ],

    tbar: [{
        xtype: 'textfield',
        reference: 'queryfield',
        emptyText: 'Please input a query'
    }, {
        text: 'Load',
        handler: 'onClickLoad',
        glyph: 'xf021@FontAwesome'
    }, {
        text: 'Add Record',
        handler: 'onClickAddRecord',
        glyph: 'xf055@FontAwesome'
    }, '->', {
        text: 'Save Records',
        handler: 'onClickSaveRecords',
        glyph: 'xf0c7@FontAwesome'
    }]

});
