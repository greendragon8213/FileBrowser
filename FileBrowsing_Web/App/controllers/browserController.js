'use strict';

angular.module('myApp')
.controller('browserController', ['$scope', '$rootScope', 'browserService', '$http', function ($scope, $rootScope, browserService, $http) {

   $scope.CurrPath = '';
    $scope.FolderName = '';
    $scope.ParentPath = '';
    $scope.SubFolders = {};
    $scope.NestedFiles = {};

    $scope.goToParentNode = goToParentNode;
    $scope.UpdateNode = UpdateNode;
    $scope.HideUpdSnipper = false;

    init();

    function init() {
        UpdateNode('./');
    }

    function goToParentNode() {
        UpdateNode($scope.ParentPath);
    }

    function UpdateNode(path) {
        
        $scope.HideUpdSnipper = false;
        browserService.GetFolderNode(path).success(function (data) {
            $scope.CurrPath = data.FullPath;
            $scope.FolderName = data.Name;
            $scope.ParentPath = data.ParentPath;
            $scope.SubFolders = data.SubFolders;
            $scope.NestedFiles = data.NestedFiles;
            
        }).error(function() {
            console.log("error when trying to get data by path");
        }).finally(function() {
            $scope.HideUpdSnipper = true;
        });

        $rootScope.$broadcast('currPathChanged', { newPath: path });
    }


    }]);