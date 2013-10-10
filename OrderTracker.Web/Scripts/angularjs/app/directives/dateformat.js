angular.module('orderTrackerApp')
.directive('fcsaDateFormat', function ($filter) {

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
                    var testValue = moment(viewValue, 'MM/DD/YYYY');

                    ctrl.$setValidity('fcsaDateFormat', testValue.isValid());
                }

                return viewValue;
            });
        }
    };
});