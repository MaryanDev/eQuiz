
(function (angular) {
    var equizModule = angular.module("equizModule");

    equizModule.controller("dashboardCtrl", ["$scope", "$http", "dashboardService", function ($scope, $http, dashboardService) {
        $scope.allQuizes = null;

        activate();
        function activate() {
            var quizPromise = dashboardService.getQuizzes();
            quizPromise.success(function (data) {
                $scope.allQuizes = data;
            });
        };

        //$scope.getQuestionById = function (questionId) {

        //    $http({
        //        method: "GET",
        //        url: "GetQuestionsById",
        //        params: { id: questionId }

        //    }).then(function (response) {
        //        console.log(response.data);
        //    });
        //};

    }]);
})(angular);