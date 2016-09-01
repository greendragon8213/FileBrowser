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