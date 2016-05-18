/// <reference path="D:\MyFork_eQuiz\eQuiz\modules\eQuiz.Web\Scripts/libs/angularjs/angular.js" />
(function (angular) {
    var equizModule = angular.module("equizModule");

    equizModule.controller("quizInRunCtrl", ["$scope", "$http",  function ($scope, $http) {
        
        $scope.getQuestionById = function (questionId) {

            $http({
                method: "GET",
                url: "GetQuestionsById",
                params: { id: questionId }

            }).then(function (response) {
                console.log(response.data);
            });
        };

    }]);
})(angular);