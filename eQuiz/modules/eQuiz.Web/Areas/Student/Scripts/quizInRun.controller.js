/// <reference path="D:\MyFork_eQuiz\eQuiz\modules\eQuiz.Web\Scripts/libs/angularjs/angular.js" />
(function (angular) {
    var equizModule = angular.module("equizModule");

    equizModule.controller("quizInRunCtrl", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $scope.quizQuestions = null;
        $scope.quizId = $routeParams.id;

        getQuestionById($scope.quizId);

        function getQuestionById(questionId) {
            $http({
                method: "GET",
                url: "GetQuestionsById",
                params: { id: questionId }

            }).then(function (response) {
                console.log(response.data);
                $scope.quizQuestions = response.data;
            });
        };

    }]);
})(angular);