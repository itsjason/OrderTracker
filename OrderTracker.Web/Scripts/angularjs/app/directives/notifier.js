angular.module('orderTrackerApp')
    .directive('ngNotifier', function () {
        return {
            replace: true,
            templateUrl: "../scripts/angularjs/app/templates/notifier.html",
            scope: {                
                notifyText: "=ngNotifier"      
            }
        };
    });