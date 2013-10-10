angular.module('orderTrackerApp')
    .directive('fcsaNotifier', function () {
        return {
            replace: true,
            templateUrl: "../scripts/angularjs/app/templates/notifier.html",
            scope: {                
                notifyText: "=fcsaNotifier"      
            }
        };
    });