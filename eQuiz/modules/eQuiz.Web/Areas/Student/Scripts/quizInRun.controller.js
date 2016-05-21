/// <reference path="D:\MyFork_eQuiz\eQuiz\modules\eQuiz.Web\Scripts/libs/angularjs/angular.js" />
(function (angular) {
    var equizModule = angular.module("equizModule");

    equizModule.controller("quizInRunCtrl", ["$scope", "$http", "$routeParams", "timerService",
        function ($scope, $http, $routeParams, timerService) {
            $scope.quizQuestions = null;

            $scope.quizId = $routeParams.id;
            $scope.quizDuration = $routeParams.dura;
            $scope.currentQuestion = 0;
            $scope.finalUserResult = {
                quizId: $scope.quizId,
                startDate: null,
                finishDate: null,
                answerResult: []
            };

            $scope.startDate = null;
            $scope.finishDate = null;

            $scope.setCurrentQuestion = function (questionId) {
                if (questionId < $scope.quizQuestions.length && questionId >= 0)
                    $scope.currentQuestion = questionId;
            };

            getQuestionById($scope.quizId);

            function getQuestionById(questionId) {
                $http({
                    method: "GET",
                    url: "GetQuestionsById",
                    params: { id: questionId }

                }).then(function (response) {
                    console.log(response.data);
                    $scope.quizQuestions = response.data;
                    $scope.startDate = Date.now();
                });
            };

            $scope.setUserChoice = function (index, questionId, answerId, isAutomatic, quizBlock, answerText, answerTime) {
                $scope.finalUserResult.answerResult[index] = {
                    Id: questionId, AnswerId: answerId, AnswerText: answerText, answerTime: answerTime, IsAutomatic: isAutomatic, QuizBlock: quizBlock
                };
                $scope.finalUserResult.startDate = $scope.startDate.toString();
                console.log($scope.finalUserResult);
                //console.log($scope.finalUserResult.answerResult.length);
            };

            // Timer
            $scope.tSeconds = 0;
            $scope.tMinutes = $scope.quizDuration;

            $scope.timer_1 = $scope.tSeconds;
            $scope.minutes = $scope.tMinutes;
            $scope.myStyle = {};
            var stop;

            $scope.start = function () {
                timerService.start();
            }
            $scope.stop = function () {
                timerService.stop();
            }
            $scope.reset = function () {
                timerService.reset();
            }

        }]);
})(angular);