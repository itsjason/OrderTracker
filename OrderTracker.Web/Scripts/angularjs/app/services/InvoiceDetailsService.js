angular.module('orderTrackerApp')
    .service('invoiceDetailsSvc', function ($resource) {

        var resource;

        resource = $resource('/api/Invoices/:invoiceId/LineItems/:id'
            , { invoiceId: '@InvoiceId', id: "@Id" } // default mappings used by Update and Save
            , { update: { method: 'PUT' } }
        );

        return {
            resource: resource,
        };

    });

