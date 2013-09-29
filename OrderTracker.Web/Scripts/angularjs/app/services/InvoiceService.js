angular.module('orderTrackerApp')
    .service('invoiceSvc', function ($resource) {

        var resource;

        resource = $resource('/api/Invoices/:id'
            , { id: '@Id' }
            , { update: { method: 'PUT' } }
        );

        return {
            resource: resource,
        };

    });

