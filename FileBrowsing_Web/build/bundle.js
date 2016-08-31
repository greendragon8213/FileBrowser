var app = angular.module('myApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            //templateUrl: 'views/home.html',
            controller: 'homeController',

            views: {
                '': { templateUrl: 'views/home.html' },

                'explorer@home': {
                    templateUrl: 'views/explorerPartial.html',
                    controller: 'browserController'
                },

                'statistic@home': {
                    templateUrl: 'views/statisticPartial.html',
                    controller: 'statisticController'
                }
                
            }
        })

        .state('explorer', {
            url: '/explorer',
            templateUrl: 'views/explorerPartial.html',
            controller: 'browserController'
        })

        .state('statistic', {
            url: '/statistic',
            templateUrl: 'views/statisticPartial.html',
            controller: 'statisticController'
        });

            }]);


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
'use strict';

    angular.module('myApp')
    .controller('homeController', ['$scope', function ($scope) {
        alert("h");
        $scope.message = "Now viewing home!";
}]);
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
(function () {

    'use strict';

    angular.module('myApp')
        .service('browserService', ['$http', function ($http) {

            this.apidestination = 'http://localhost:54454/api/';

            this.GetFolderNode = function (path) {
                console.log("trying to send ajax to get folder node ", path);
                if (path)
                    return $http.get(this.apidestination + 'Browser/GetAllNodesByFolderPath?path=' + path);

                return $http.get(this.apidestination + 'Browser/GetAllNodesFromMyComputer');
            }

        }]);

})()
;(function() {
    'use strict';

    angular.module('myApp')
        .service('statisticService', ['$http', '$q', function($http, $q) {

            this.apidestination = 'http://localhost:54454/api/';
            //var requests = {};

            //this.clearRequestsCache = clearRequestsCache;

            //function clearRequestsCache() {
            //    requests = {};
            //}

            var getFilesCount = function (path, data) {
                var apidestination = 'http://localhost:54454/api/';

                console.log("getFCount Ajax ", path);

                var res = '';

                if (path) {
                    res = $http.post(
                        apidestination + 'Browser/GetFilesCount?path=' + path,
                        data,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                } else {
                    res = $http.post(
                        apidestination + 'Browser/GetFilesCountFromAllDisks',
                        data,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                }
                return res;
            }
            
            var canceller10, isSending10 = false;
            this.GetFilesCountLess10 = function (path) {
                var data = {
                    "MaxFileLengthMb": "10"
                }

                if (isSending10) {
                    console.log("trying stop 10 ", path);
                    canceller10.resolve();
                }
                isSending10 = true;
                canceller10 = $q.defer();

                var res = getFilesCount(path, data);

                res.success(function () {
                    isSending10 = false;
                }).error(function () {
                    isSending10 = false;
                });

                return res;
            }

            var canceller10_50, isSending10_50 = false;
            this.GetFilesCountBtw10_50 = function (path) {
                var data = {
                    "MinFileLengthMb": "10",
                    "MaxFileLengthMb": "50"
                }

                if (isSending10_50) {
                    console.log("trying stop 10_50 ", path);
                    canceller10_50.resolve();
                }
                isSending10_50 = true;
                canceller10_50 = $q.defer();

                var res = getFilesCount(path, data);

                res.success(function () {
                    isSending10_50 = false;
                }).error(function () {
                    isSending10_50 = false;
                });

                return res;

                //if(!requests.GetFilesCountBtw10_50){
                //    requests.GetFilesCountBtw10_50 = getFilesCount(path, data);
                //    }

                //return requests.GetFilesCountBtw10_50.success(function () {
                //    isSending10_50 = false;
                //    requests.GetFilesCountBtw10_50 = null;
                //}).error(function () {
                //    isSending10_50 = false;
                //});
            }

            var canceller100, isSending100 = false;
            this.GetFilesCountMore100 = function (path) {
                var data = {
                    "MinFileLengthMb": "100"
                }

                if (isSending100) {
                    console.log("trying stop 100 ", path);
                    canceller100.resolve();
                }
                isSending100 = true;
                canceller100 = $q.defer();

                var res = getFilesCount(path, data);

                res.success(function () {
                    isSending100 = false;
                }).error(function () {
                    isSending100 = false;
                });

                return res;
            }

        }]);

})()
//# sourceMappingURL=bundle.js.map