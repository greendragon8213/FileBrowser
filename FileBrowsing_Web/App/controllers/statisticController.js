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

        $scope.HideSnipperLess = false;
        statisticService.GetFilesCountLess10(currPath).then(function (prom) {
            if (prom) {
                $scope.Less10Mb = prom.data;
                $scope.HideSnipperLess = true;
            }
        }).catch(function() {
            console.log('error when trying to get files count less than 10Mb');
            $scope.Less10Mb = "???";
            $scope.HideSnipperLess = true;
        });

        $scope.HideSnipperBtw = false;
        statisticService.GetFilesCountBtw10_50(currPath).then(function (prom) {
            if (prom) {
                $scope.Between10_50Mb = prom.data;
                $scope.HideSnipperBtw = true;
            }
        }).catch(function () {
            console.log('error when trying to get files count between 10 - 50Mb');
            $scope.Between10_50Mb = "???";
            $scope.HideSnipperBtw = true;
        });

        $scope.HideSnipperMore = false;
        statisticService.GetFilesCountMore100(currPath).then(function (prom) {
            if (prom) {
                $scope.More100Mb = prom.data;
                $scope.HideSnipperMore = true;
            }
           
        }).catch(function () {
            console.log('error when trying to get files count more than 100Mb');
            $scope.More100Mb = "???";
            $scope.HideSnipperMore = true;
        });
    }

    $scope.$on('currPathChanged', function (event, response) {
        $scope.UpdateStatistic(response.newPath);
    });

}]);