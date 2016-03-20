/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MyApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onClickAddRecord: function () {
        var grid = this.lookup('mainlist'),
            store = grid.getStore();
        store.insert(0, {});
    },

    onClickSaveRecords: function () {
        var grid = this.lookup('mainlist'),
            store = grid.getStore();
        store.sync();
    },

    onClickLoad: function () {
        var grid = this.lookup('mainlist'),
            store = grid.getStore();

        var field = this.lookup('queryfield'),
            query = field.getValue() || '';

        store.getProxy().setQuery(query);
        store.load();
    },

    onRemoveClick: function (grid, rowIndex) {
        var grid = this.lookup('mainlist'),
            store = grid.getStore();
        store.removeAt(rowIndex);
    }
});
