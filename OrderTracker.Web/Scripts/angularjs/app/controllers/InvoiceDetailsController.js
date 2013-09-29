angular.module('orderTrackerApp')
    .controller("InvoiceDetailsCtrl", function ($scope, $window, $routeParams, invoiceSvc, invoiceDetailsSvc) {

        $scope.InvoiceDetailUpdateNotification = '';
        $scope.invoiceId = $routeParams.id;

        $scope.Invoice = invoiceSvc.resource.get({ id: $scope.invoiceId });
        $scope.LineItems = invoiceDetailsSvc.resource.query({ invoiceId: $scope.invoiceId });

        $scope.saveInvoice = function (invoice) {
            // Call a POST for a new invoice and a PUT for a changed invoice.  
            // These verb and commands can be customized in the Service files.

            if (invoice.Id <= 0) {
                // Invoice is brand new.  $save will trigger a POST.
                invoice.$save(
                    function () {
                        $window.location.href = "/Angular/";
                    });

            } else {
                // Invoice exists.  $update will trigger a PUT.
                invoice.$update(
                    function () {
                        $scope.InvoiceDetailUpdateNotification = 'Invoice Update Succesful';
                    });
            }
        };

        $scope.getLineItemsTotals = function () {

            var total = 0;

            if ($scope.LineItems) {
                // Calculate invoice grand total
                for (var i = 0; i < $scope.LineItems.length; i++) {
                    var lineItem = $scope.LineItems[i];

                    total += lineItem.Quantity * lineItem.Rate;
                }
            }

            // Add Quantity and Rate for new item row
            if ($scope.lineItem && $scope.lineItem.Quantity && $scope.lineItem.Rate) {
                total += parseFloat($scope.lineItem.Quantity) * parseFloat($scope.lineItem.Rate);
            }

            return total;
        };


        $scope.addLineItem = function (lineItem) {
            lineItem.InvoiceId = $scope.invoiceId;
            invoiceDetailsSvc.resource.save(lineItem,
                function (addedItem) {
                    // add newly saved item to the list
                    $scope.LineItems.push(addedItem);
                    $scope.lineItem = null;
                });
        };

        $scope.updateLineItem = function (lineItem) {
            lineItem.$update(function() {
                 $scope.InvoiceDetailUpdateNotification = 'LineItem Update Succesful';
            });
        };

        $scope.deleteLineItem = function (lineItem) {
            lineItem.$delete(function () {
                // Remove the line item from the in memory collection
                $scope.LineItems.splice($scope.LineItems.indexOf(lineItem), 1);
            });
        };
    });
