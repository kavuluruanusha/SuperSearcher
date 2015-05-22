'use strict';

/**
 * @ngdoc overview
 * @name superSearcherApp
 * @description
 * # superSearcherApp
 *
 * Main module of the application.
 */
var app = angular
  .module('superSearcherApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'googleSearch',
    'bingSearch'
  ]);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  app.run(function(googleSearchService, bingSearchService){

    var searchEngineServices = {
      "Google": googleSearchService,
      "Bing": bingSearchService
    };

    app.value("searchEngineServices",searchEngineServices);
    app.value("pageCnt", pageCnt)
  
  });
  
