'use strict';

var app = angular.module('superSearcherApp');

gsApp.factory('superSearchService', ['$rootScope', 'searchEngineServices', 'pageCnt', function($rootScope, searchEngineServices, pageCnt) {
	$rootScope.searchResults = {};
	
    return {
        search: function(query, skipCnt) {
            
        	$rootScope.searchResults = [];
        	$rootScope.searchResultsCnt = 0;
            for (var i = 0; i < $rootScope.searchEngines.length; i++) {
            	var searchEngine = $rootScope.searchEngines[i];
            	var service = searchEngineServices[searchEngine.name];
            	service.search(query, skipCnt, pageCnt).success(function(data){
            		var result = {
            			"engine"; data.engine,
            			"results": data.results;
            		}
            		updateResult(result);
            	})
            };

        },
        updateResult: function(newResult){
        	$rootScope.searchResults[newResult.engine] = newResult.results;
        	$rootScope.searchResultsCnt++;
        	var finalResults = [];
        	var totalCnt = pageCnt * searchEngines.length;
        	if ($rootScope.searchResults.length === $rootScope.searchResultsCnt){
        		cnt = 0;

        		while(cnt < totalCnt)
        		{
	        		for(int i=0; i<$rootScope.prioritizedEngines; i++){
	        			var engine = $rootScope.prioritizedEngines[i].engine;
	        			var displayCnt = $rootScope.prioritizedEngines[i].displayCnt;
	        			var curIdex = $rootScope.prioritizedEngines[i].curIdex;

	        			for (int j=curIdex; j<curIdex+displayCnt; curIdex++){
	        				var engResults = $rootScope.searchResults[engine];
	        				if (j<engResults.length){
	        					finalResults.push(engResults[j]);
	        					cnt++;
	        				}

	        				if (cnt == totalCnt){
	        					break;
	        				}
	        			}

	        			$rootScope.prioritizedEngines[i].curIdex = curIdex;
	        			if (cnt == totalCnt){
	        				break;
	        			}
	        		}
        		}
        		var args = {
        			"results": finalResults
        		};
        		$rootScope.$broadcast('gotSearchResults',args);

        	}
        }
    };
}]);