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
