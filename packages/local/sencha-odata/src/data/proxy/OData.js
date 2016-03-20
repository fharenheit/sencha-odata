/**
 * @class Ext.data.proxy.OData
 * @author Shinobu Kawano <http://shinobukawano.com>
 */
Ext.define('Ext.data.proxy.OData', {
    extend: 'Ext.data.proxy.Rest',
    alternateClassName: 'Ext.data.ODataProxy',
    alias: 'proxy.odata',

    config: {
        /**
         * @cfg {String} serviceRoot
         */
        serviceRoot: '',

        /**
         * @cfg {String} query
         */
        query: '',

        /**
         * @cfg {Object} data
         */
        data: null,

        /**
         * @cfg {Ext.data.Store} target
         */
        target: null,

        /**
         * @cfg {Boolean} noCache
         */
        noCache: false
    },

    /**
     * @override
     * @param {Ext.data.Request} request The request
     * @return {Ext.data.Request} The request
     * @returns {*}
     */
    sendRequest: function (request) {
        var me = this;
        return request.getAction() === 'read' ?
            me._read(request) : me._write(request);
    },

    /**
     * @private
     * @param {Ext.data.Request} request The request
     * @return {Ext.data.Request} The request
     */
    _read: function (request) {
        var me = this;

        odatajs.oData.request(
            me._convertRequest(request),
            function (data, response) {
                var target = me.getTarget();
                target.loadData(data.value);
                target.fireEvent('load', target);

                /**
                 * @event success
                 */
                me.fireEvent('success', me, data, response);
            },
            function (error) {
                /**
                 * @event failure
                 */
                me.fireEvent('failure', me, error);
                Ext.Logger.warn(error.message);
            }
        );

        return request;
    },

    /**
     * @private
     * @param {Ext.data.Request} request The request
     * @return {Ext.data.Request} The request
     */
    _write: function (request) {
        var me = this;

        odatajs.oData.request(
            me._convertRequest(request),
            function (data, response) {
                /**
                 * @event success
                 */
                me.fireEvent('success', me, data, response);

                me.processResponse(true, request.getOperation(),
                    request, response);
            },
            function (error) {
                /**
                 * @event failure
                 */
                me.fireEvent('failure', me, error);
                Ext.Logger.warn(error.message);

                me.processResponse(false, request.getOperation(),
                    request, error.response);
            }
        );

        return request;
    },

    /**
     * @private
     * @param {Ext.data.Request} request The request
     * @returns {Object}
     */
    _convertRequest: function (request) {
        var me = this,
            config = request.getCurrentConfig(),
            req = {};

        req.requestUri = me._buildUri(request);
        req.method = me.getMethod(request);

        if (req.method === 'PUT') {
            req.method = 'PATCH';
        }

        req.headers = me._buildHeaders();
        req.data = request.getJsonData();

        return req;
    },

    /**
     * @private
     * @param {Ext.data.Request} request The request
     * @returns {String}
     */
    _buildUri: function (request) {
        var me = this,
            operation = request.getOperation(),
            records = operation.getRecords(),
            record = records ? records[0] : null,
            url = me.getUrl(),
            serverRoot = me.getServiceRoot(),
            query = me.getQuery(),
            id;

        if (record && !record.phantom) {
            id = record.getId();
        }
        else {
            id = operation.getId();
        }

        if (me.getAppendId() && me.isValidId(id)) {
            url += ("('" + encodeURIComponent(id) + "')");
        }

        if (request.getAction() === 'read') {
            url += ('?' + query );
        }

        url = serverRoot + url;

        request.setUrl(url);

        return url;
    },

    /**
     * @private
     * @param {String }type
     * @returns {Object}
     */
    _buildHeaders: function (type) {
        var type = this.getReader().type,
            contentType = 'application/' + type,
            accept = contentType;

        return {
            'Content-Type': contentType,
            'Accept': accept,
            'If-Match': '*'
        };
    }
});

/**
 * @class Ext.ux.overrides.data.Store
 * @overrides Ext.data.Store
 */
Ext.define('Ext.ux.overrides.data.Store', {
    override: 'Ext.data.Store',
    updateProxy: function (proxy) {
        if (proxy.type === 'odata') {
            proxy.setTarget(this);
        }
    }
});
