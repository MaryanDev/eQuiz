/// <reference path="C:\Users\maryan.maryan-PC\Desktop\eQuiz-master\eQuiz\modules\eQuiz.Web\Scripts/libs/angularjs/angular.js" />
(function (angular) {
    var equizModule = angular.module("equizModule");

    equizModule.controller("dashboardCtrl", ["$scope", "$http", function ($scope, $http) {
        $scope.allQuizes = null;

        $http.get("GetQuizes").success(function (data) {
            $scope.allQuizes = data;
            console.log($scope.allQuizes);
        });
    }]);
})(angular);