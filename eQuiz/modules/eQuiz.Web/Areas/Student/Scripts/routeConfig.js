/// <reference path="templetes/QuizInRunTemplete.html" />
(function (angular) {
    var equizModule = angular.module("equizModule");
    equizModule.config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "../templetes/DashboardTemplete.html",
            controller: "dashboardCtrl"
        })
        .when("/quizInRun", {
            templateUrl: "../templetes/QuizInRunTemplete.html",
            controller: "quizInRunCtrl"
        })
        .otherwise({
            redirectTo: '/'
        });

    });


})(angular);