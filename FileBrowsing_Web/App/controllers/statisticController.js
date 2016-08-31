'use strict';

angular.module('myApp')
.controller('statisticController', ['$scope', 'statisticService', function ($scope, statisticService) {
    
    $scope.Less10Mb = '';
    $scope.More100Mb = '';
    $scope.Between10_50Mb = '';

    $scope.HideSnipperLess = false;
    $scope.HideSnipperBtw = false;
    $scope.HideSnipperMore = false;

    $scope.UpdateStatistic = function (currPath) {
        //console.log("updating with data:", currPath);

        $scope.HideSnipperLess = false;
        statisticService.GetFilesCountLess10(currPath).success(function (data) {
            $scope.Less10Mb = data;
            //console.log($scope.Less10Mb);
            $scope.HideSnipperLess = true;
            //console.log($scope.HideSnipperLess);
        }).error(function() {
            console.log('error when trying to get files count less than 10Mb');
            $scope.Less10Mb = "???";
            $scope.HideSnipperLess = true;
        });

        $scope.HideSnipperBtw = false;
        statisticService.GetFilesCountBtw10_50(currPath).success(function (data) {
            $scope.Between10_50Mb = data;
            $scope.HideSnipperBtw = true;
        }).error(function () {
            console.log('error when trying to get files count between 10 - 50Mb');
            $scope.Between10_50Mb = "???";
            $scope.HideSnipperBtw = true;
        });

        $scope.HideSnipperMore = false;
        statisticService.GetFilesCountMore100(currPath).success(function (data) {
            $scope.More100Mb = data;
            $scope.HideSnipperMore = true;
        }).error(function () {
            console.log('error when trying to get files count more than 100Mb');
            $scope.More100Mb = "???";
            $scope.HideSnipperMore = true;
        });
    }

    $scope.$on('currPathChanged', function (event, response) {
        console.log("on: сurrPath changed: ", response.newPath);
        $scope.UpdateStatistic(response.newPath);
    });

    $scope.UpdateStatistic('');
}]);