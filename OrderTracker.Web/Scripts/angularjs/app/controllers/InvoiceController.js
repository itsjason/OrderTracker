angular.module('orderTrackerApp')
    .controller("InvoiceCtrl", function ($scope, $window, invoiceSvc) {

        $scope.Invoices = invoiceSvc.resource.query();

        $scope.getLineItemsTotals = function (invoice) {

            var total = 0;

            for (var i = 0; i < invoice.LineItems.length; i++) {
                total += invoice.LineItems[i].Quantity * invoice.LineItems[i].Rate;
            }

            return total;
        };

        $scope.deleteInvoice = function (invoice) {
            invoice.$remove(function () {
                // Remove the invoice from the in memory collection
                $scope.Invoices.splice($scope.Invoices.indexOf(invoice), 1);
            });
        };
    });
