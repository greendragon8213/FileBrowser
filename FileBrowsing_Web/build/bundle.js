var app = angular.module('myApp', ['ui.router']);

app.constant("webconfig", {
    apidestination: 'http://localhost:54454/api/'
});

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/home');

                $stateProvider
                    .state('home', {
                        url: '/home',
                        templateUrl: 'views/home.html',
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
'use strict';

    angular.module('myApp')
    .controller('homeController', ['$scope', function ($scope) {
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
(function () {

    'use strict';

    angular.module('myApp')
        .service('browserService', ['$http', 'webconfig', function ($http, webconfig) {

            this.GetFolderNode = function (path) {
                if (path)
                    return $http.get(webconfig.apidestination + 'Browser/GetAllNodesByFolderPath?path=' + path);

                return $http.get(webconfig.apidestination + 'Browser/GetAllNodesFromMyComputer');
            }

        }]);

})()
;
(function() {
    'use strict';

    angular.module('myApp')
        .service('statisticService', [
            '$http', '$q', 'webconfig', function ($http, $q, webconfig) {

                var getFilesCount = function (path, data) {

                    var defer = $q.defer();
                    var promise = defer.promise;
                    promise.abort = abort;
                    
                    var res;

                    if (path) {
                        res = $http.post(
                            webconfig.apidestination + 'Browser/GetFilesCount?path=' + path,
                            data,
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        );
                    } else {
                        res = $http.post(
                            webconfig.apidestination + 'Browser/GetFilesCountFromAllDisks',
                            data,
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        );
                    }

                    res.then(data => {
                        defer.resolve(data);
                    });

                    return promise;

                    function abort(data) {
                        defer.resolve(data);
                    }
                }

                var promise10;
                this.GetFilesCountLess10 = function(path) {
                    var data = {
                        "MaxFileLengthMb": "10"
                    }

                    if (promise10) promise10.abort();

                    promise10 = getFilesCount(path, data);

                    return promise10;
                }

                var promise10_50;
                this.GetFilesCountBtw10_50 = function(path) {
                    var data = {
                        "MinFileLengthMb": "10",
                        "MaxFileLengthMb": "50"
                    }

                    if (promise10_50) promise10_50.abort();

                    promise10_50 = getFilesCount(path, data);

                    return promise10_50;
                }

                var promise100;
                this.GetFilesCountMore100 = function(path) {
                    var data = {
                        "MinFileLengthMb": "100"
                    }

                    if (promise100) promise100.abort();

                    promise100 = getFilesCount(path, data);

                    return promise100;
                }
            }
        ]);
})();

//# sourceMappingURL=bundle.js.map