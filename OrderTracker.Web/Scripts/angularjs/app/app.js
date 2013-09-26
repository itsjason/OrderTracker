'use strict';

// Declare app level module which depends on filters, and services
angular.module('orderTrackerApp', ['ngResource']).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/', { templateUrl: '../scripts/angularjs/app/templates/invoice.html', controller: 'InvoiceCtrl' });
      $routeProvider.when('/InvoiceDetail/:id', { templateUrl: '../scripts/angularjs/app/templates/invoiceDetail.html', controller: 'InvoiceDetailsCtrl' });
      $routeProvider.otherwise({ redirectTo: '/' });
  }]);
