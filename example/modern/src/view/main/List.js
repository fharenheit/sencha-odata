/**
 * This view is an example list of people.
 */
Ext.define('MyApp.view.main.List', {
    extend: 'Ext.grid.Grid',
    xtype: 'mainlist',

    requires: [
        'MyApp.store.People'
    ],

    title: 'Personnel',

    store: {
        type: 'people'
    },

    columns: [
        { text: 'FirstName',  dataIndex: 'FirstName', flex:1 },
        { text: 'LastName', dataIndex: 'LastName', flex: 1 },
        { text: 'Gender', dataIndex: 'Gender', flex: 1 }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
