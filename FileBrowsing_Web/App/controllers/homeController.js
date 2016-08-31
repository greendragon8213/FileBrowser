'use strict';

    angular.module('myApp')
    .controller('homeController', ['$scope', function ($scope) {
        alert("h");
        $scope.message = "Now viewing home!";
}]);