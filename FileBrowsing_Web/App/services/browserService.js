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