'use strict';

angular.module('myApp')
.controller('browserController', ['$scope', '$rootScope', 'browserService', '$http', function ($scope, $rootScope, browserService, $http) {

   $scope.CurrPath = '';
    $scope.FolderName = '';
    $scope.ParentPath = '';
    $scope.SubFolders = {};
    $scope.NestedFiles = {};

    //$scope.GoToPath = function (path) {
    //    $scope.CurrPath = path;
    //    $scope.GetSubFolders(); 
    //    $scope.GetNestedFiles();
    //    $rootScope.$broadcast('currPathChanged', { newPath: $scope.CurrPath });
    //}
    $scope.goToParentNode = goToParentNode;
    $scope.UpdateNode = UpdateNode;

    init();

    function init() {
        UpdateNode('');
    }

    function goToParentNode() {
        UpdateNode($scope.ParentPath);
    }

    function UpdateNode(path) {

        console.log("trying to updateNode ", path);
        console.log($http.pendingRequests);

        browserService.GetFolderNode(path).success(function (data) {
            $scope.CurrPath = data.FullPath;
            $scope.FolderName = data.Name;
            $scope.ParentPath = data.ParentPath;
            $scope.SubFolders = data.SubFolders;
            $scope.NestedFiles = data.NestedFiles;

            console.log("Updated", data);

        }).error(function() {
            console.log("error when trying to get data by path");
        });

        $rootScope.$broadcast('currPathChanged', { newPath: path });
    }


    }]);