angular.module('orderTrackerApp')
.directive('ngDateFormat', function ($filter) {

    return {
        require: 'ngModel',
        restrict: 'A',

        link: function (scope, element, attrs, ctrl) {
            ctrl.$formatters.unshift(function (modelValue) {
                // To be diplayed to the user;

                if (modelValue) {
                    modelValue = $filter('moment')(modelValue, 'MM/DD/YYYY');
                }

                return modelValue;
            });

            ctrl.$parsers.unshift(function (viewValue) {
                // To be added back into the model

                if (viewValue) {
                    viewValue = $filter('moment')(viewValue, 'MM/DD/YYYY');
                }

                return viewValue;
            });
        }
    };
});