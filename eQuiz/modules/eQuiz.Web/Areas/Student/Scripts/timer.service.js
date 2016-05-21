(function (angular) {
    var equizModule = angular.module("equizModule");

    equizModule.factory("timerService", ["$interval", function ($interval) {

        var service = {
            start: startTimer,
            stop: stopTimer,
            reset: resetTimer
        };

        return service;

        function startTimer () {
            if (angular.isDefined(stop)) return;

            stop = $interval(function () {

                if ($scope.timer_1 > 0) {
                    $scope.timer_1 = $scope.timer_1 - 1;
                } else if ($scope.minutes > 0) {
                    $scope.minutes = $scope.minutes - 1;
                    $scope.timer_1 = 59;
                } else {
                    $scope.Stop();
                }
                if ($scope.minutes <= 119) {
                    $scope.myStyle = {
                        color: 'red'
                    }
                } else {
                    $scope.myStyle = {
                        color: 'black'
                    }
                }
            }, 1000);
        };//start timer

        function stopTimer () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        };

        function resetTimer () {
            $scope.Stop();
            if ($scope.tSeconds >= 60 && $scope.tSeconds < 0) {
                $scope.tSeconds = 0;
            }

            if ($scope.tMinutes < 0) {
                $scope.tMinutes = 0;
            }

            $scope.timer_1 = $scope.tSeconds;
            $scope.minutes = $scope.tMinutes;
            $scope.myStyle = {
                color: 'black'
            }
        };

        $scope.$on('$destroy', function () {
            $scope.Stop();
        });

    }]);
})(angular);