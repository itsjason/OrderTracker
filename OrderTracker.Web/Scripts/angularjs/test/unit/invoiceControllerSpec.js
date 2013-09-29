'use strict';

describe('invoice controller', function () {

    var scope,
        invoice,
        invoices,
        invoiceService;

    beforeEach(angular.mock.module('orderTrackerApp'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        invoice = {
            LineItems: [
                { Rate: 20, Quantity: 2 } // 40
                , { Rate: 15, Quantity: 4 } // 60
            ]
        };

        invoices = [invoice];

        invoiceService = {
            resource: {
                query: function () {
                    return invoices;
                }
            }
        }; 

        $controller('InvoiceCtrl', { $scope: scope, invoiceSvc: invoiceService });
    }));

    it('should return total invoice amount', function () {
        expect(scope.getLineItemsTotals(invoice)).toEqual(100);
    });

    it('should query the resource', function () {
        expect(scope.Invoices).toEqual(invoices);
    });

});
