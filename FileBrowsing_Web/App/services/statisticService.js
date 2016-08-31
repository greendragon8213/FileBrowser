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