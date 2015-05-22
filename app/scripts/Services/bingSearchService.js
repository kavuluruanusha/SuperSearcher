'use strict';

var bingApp = angular.module('bingSearch',[]);

gsApp.factory('bingSearchService', ['$http', function($http) {
    return {
        search: function(query, skipCnt, topCnt) {
            var url = "https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=%27" + query +"%27" + "&$format=json" +"&$skip=" + skipCnt +"&$top=" + topCnt;
            return $http.get(url,{
            	
                transformResponse: function (data, headers) {  
                	var results=[];       
                	var result = {};           
                    for (var i = 0; i<data.d.results.length; i++) {
                    	var item = data.d.results[i];
                    	result.title = item.Title;
                    	result.description = item.Description;
                    	result.link = item.Url;
                    	result.engine = "Bing";
                    	results.push(result);
                    };
                    var engineRes = {
                    	"engine": "Bing",
                    	"results": results;
                    };
                    return engineRes;
                }
            });
        }
    };
}]);