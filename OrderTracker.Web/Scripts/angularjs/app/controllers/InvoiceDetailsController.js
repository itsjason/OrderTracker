angular.module('orderTrackerApp')
    .controller("InvoiceDetailsCtrl", function($scope, $window, $routeParams, invoiceProcessor) {

        $scope.InvoiceDetailUpdateNotification = '';
        $scope.apiBaseUrl = '/api/Invoices';
        $scope.apiLineItemBaseUrl = '/api/LineItems/';
        $scope.invoiceId = $routeParams.id;

        $scope.InvoiceDetail = invoiceProcessor.getInvoiceById($scope.invoiceId, $scope.apiBaseUrl + "/");
        $scope.InvoiceDetail.then(
            function(output) {
                $scope.InvoiceDetail = output;

                if ($scope.InvoiceDetail.Id <= 0) {
                    $scope.InvoiceDetail.InvoiceDate = '';
                }
            },
            function(response) {

            }
        );

        $scope.addInvoice = function(invoice) {
            if (invoice.Id <= 0) {
                invoiceProcessor.addInvoice(invoice, $scope.apiBaseUrl + "/");

            } else {
                invoice.$save();
                //invoiceProcessor.editInvoice(invoice, $scope.apiBaseUrl + "/");

                $scope.InvoiceDetailUpdateNotification = 'Invoice Update Succesful';
            }
        };

        $scope.getLineItemsTotals = function() {

            var total = 0;

            if ($scope.InvoiceDetail.LineItems) {
                for (var i = 0; i < $scope.InvoiceDetail.LineItems.length; i++) {
                    var lineItem = $scope.InvoiceDetail.LineItems[i];

                    total += lineItem.Quantity * lineItem.Rate;
                }
            }

            return total;
        };


        $scope.addLineItem = function(invoiceId, lineItem) {
            invoiceProcessor.addLineItem(invoiceId, lineItem, $scope.apiLineItemBaseUrl);

            $window.location.reload();
        };

        $scope.editLineItem = function(invoiceId, lineItem) {
            invoiceProcessor.editLineItem(invoiceId, lineItem.Id, lineItem, $scope.apiLineItemBaseUrl);

            $scope.InvoiceDetailUpdateNotification = 'LineItem Update Succesful';
        };

        $scope.deleteLineItem = function(invoiceId, id) {
            invoiceProcessor.deleteLineItem(invoiceId, id, $scope.apiLineItemBaseUrl);

            $window.location.reload();
        };
    });
