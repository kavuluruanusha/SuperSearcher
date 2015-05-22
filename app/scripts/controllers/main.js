'use strict';

/**
 * @ngdoc function
 * @name superSearcherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the superSearcherApp
 */
angular.module('superSearcherApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'pageCnt', 'superSearchService', function ($scope, $rootScope, pageCnt, superSearchService) {

  	$rootScope.searchEngines = [];
  	var googleSearchEngine = {
  		"name": "Google",
  		"weight": "60"
  	};

  	var bingSearchEngine = {
  		"name": "Bing",
  		"weight": "40"
  	};

  	$rootScope.searchEngines.push(googleSearchEngine);
  	$rootScope.searchEngines.push(bingSearchEngine);

  	$rootScope.prioritizedEngines = $rootScope.searchEngines.sort(function(a,b){
  		if (a.weight > b.weight){
  			return 1;
  		}else if (a.weight < b.weight){
  			return -1;
  		}else{
  			return 0;
  		}
  	});

  	$scope.pageNum = 1;
  	$scope.skipCnt = pageCnt*$rootScope.searchEngines.length;

  	for (var i = 0; i < $rootScope.prioritizedEngines.length; i++) {
  		$rootScope.prioritizedEngines[i].displayCnt = $rootScope.prioritizedEngines[i].weight * pageCnt * $rootScope.prioritizedEngines.length /100;
  	};

  	$scope.$on('gotSearchResults', function(args){
  		$scope.results = args.results;
  	});

  	$scope.$watch('searchString', function(newValue,oldValue){
  		if (typeof(newValue) == "undefined") return;
  		superSearchService.search(newValue, $scope.skipCnt);
  	});

  	$scope.$watch('pageNum', function(newValue,oldValue){
  		if (typeof(newValue) == "undefined") return;
  		$scope.skipCnt = newValue*$rootScope.searchEngines.length*pageCnt;
  		superSearchService.search($scope.searchString, $scope.skipCnt);
  	});

  	$scope.pageDown = function(){
  		$scope.pageNum--;
  		if ($scope.pageNum < 1){
  			$scope.pageNum = 1;
  		}
  	};

  	$scope.pageUp = function(){
  		$scope.pageNum++;
  	};

    
  }]);
