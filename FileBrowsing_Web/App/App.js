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

