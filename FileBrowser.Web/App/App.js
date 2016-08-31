var app = angular.module('myApp', ['ui.router']);

app.config('$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeController'
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

});