Ext.define('MyApp.store.People', {
    extend: 'Ext.data.Store',

    alias: 'store.people',

    requires: [
        'Ext.data.proxy.OData',
        'MyApp.model.Person'
    ],

    model: 'MyApp.model.Person',

    autoLoad: true,

    proxy: {
        type: 'odata',
        serviceRoot: 'http://services.odata.org/V4/(S(njmtr5f5fmfxspybolfprbj4))/TripPinServiceRW/',
        url: 'People'
    }

});
