'use strict';

    angular.module('myApp')
    .controller('homeController', function ($scope) {
        alert("h");
        $scope.message = "Now viewing home!";
});