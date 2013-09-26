angular.module('orderTrackerApp')
    .controller("InvoiceCtrl", function ($scope, $window, invoiceProcessor) {

        $scope.apiBaseUrl = '/api/Invoices';


        $scope.Invoices = invoiceProcessor.getInvoices($scope.apiBaseUrl);
        $scope.Invoices.then(
            function(output) {
            },
            function(response) {
            }
        );


        $scope.getLineItemsTotals = function(invoice) {

            var total = 0;

            for (var i = 0; i < invoice.LineItems.length; i++) {
                total += invoice.LineItems[i].Quantity * invoice.LineItems[i].Rate;
            }

            return total;
        };

        $scope.editInvoice = function(invoice) {
            invoiceProcessor.editInvoice(invoice, $scope.apiBaseUrl + "Put");
        };

        $scope.deleteInvoice = function(id) {
            invoiceProcessor.deleteInvoice(id, $scope.apiBaseUrl);

        };
    });
    