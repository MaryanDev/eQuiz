/// <reference path="E:\MyFork_eQuiz\eQuiz\modules\eQuiz.Web\Scripts/libs/angularjs/angular.js" />
(function (angular) {
    var equizModule = angular.module("equizModule");

    equizModule.factory("dashboardService", ["$http", function ($http) {

        var service = {
            getQuizzes: getQuizzesAjax
        };

        return service;

        function getQuizzesAjax() {
            var promise = $http.get("GetQuizes");
            return promise;
        };
    }]);
})(angular);