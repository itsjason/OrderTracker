function invoiceProcessor($log, $q, $resource, $window) {

    return {
        getInvoices: function (baseUrl) {

            var resource = $resource(baseUrl);

            var deffered = $q.defer();

            resource.query({},
                function(apiModel) {
                    deffered.resolve(apiModel);
                },
                function(response) {
                    deffered.reject(status);
                });

            return deffered.promise;
        },
        
        getInvoiceById: function (invoiceId, baseUrl) {

            var deffered = $q.defer();

            var resource = $resource(baseUrl, { id: '@Id' });

            resource.get({ id: invoiceId },
                function (apiModel) {
                    deffered.resolve(apiModel);
                },
                function (response) {
                    deffered.reject(status);
                });
            
            return deffered.promise;
        },
        
        addInvoice: function (invoice, baseUrl) {

            var resource = $resource(baseUrl);

            var deffered = $q.defer();

            resource.save(invoice,
                function (apiModel) {
                    deffered.resolve(apiModel);
                    $window.location.href = '/Angular';
                },
                function (response) {
                    deffered.reject(status);
                });

            return deffered.promise;
        },
        
        editInvoice: function (invoice, baseUrl) {

            var resource = $resource(baseUrl, { id: '@id' }, {update: {method:'PUT'} });

            var deffered = $q.defer();

            resource.update({ id: invoice.Id }, invoice,
                function (apiModel) {
                    deffered.resolve(apiModel);
                },
                function (response) {
                    deffered.reject(status);
                });

            return deffered.promise;
        },
        
        deleteInvoice: function (id, baseUrl) {

            var resource = $resource(baseUrl, { id: '@id' });

            var deffered = $q.defer();

            resource.remove({ id: id },
                function (apiModel) {
                    deffered.resolve(apiModel);
                    $window.location.reload();
                },
                function (response) {
                    deffered.reject(status);
                });

            return deffered.promise;
        },
        
        addLineItem: function (invoiceId, lineItem, baseUrl) {

            var resource = $resource(baseUrl, { invoiceId: '@invoiceId' });

            var deffered = $q.defer();

            resource.save({ invoiceId: invoiceId }, lineItem,
                function (apiModel) {
                    deffered.resolve(apiModel);
                },
                function (response) {
                    deffered.reject(status);
                });

            return deffered.promise;
        },

        editLineItem: function (invoiceId, id, lineItem, baseUrl) {

            var resource = $resource(baseUrl, { invoiceId: '@invoiceId', id: '@id' }, { update: { method: 'PUT' } });

            var deffered = $q.defer();

            resource.update({ invoiceId: invoiceId, id: id }, lineItem,
                function (apiModel) {
                    deffered.resolve(apiModel);
                },
                function (response) {
                    deffered.reject(status);
                });

            return deffered.promise;
        },

        deleteLineItem: function (invoiceId, id, baseUrl) {

            var resource = $resource(baseUrl, { invoiceId: '@invoiceId', id: '@id' });

            var deffered = $q.defer();

            resource.remove({ invoiceId: invoiceId, id: id },
                function (apiModel) {
                    deffered.resolve(apiModel);
                },
                function (response) {
                    deffered.reject(status);
                });

            return deffered.promise;
        },
        
        getUrlParameter: function (paramName) {
            var searchString = $window.location.search.substring(1),
                i, val, params = searchString.split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }
            return null;
        }
    };

}

orderTrackerApp.factory('invoiceProcessor', invoiceProcessor);
