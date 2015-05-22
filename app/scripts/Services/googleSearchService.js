'use strict';

var gsApp = angular.module('googleSearch',[]);

var googleUrlInfo = {
	"APIKEY":"AIzaSyDYG71KYPriZdFhHPZvgxNy4v7f3bwChbg",
	"ENGINEID":"005784838906659590806:e0jepobs7we"
};
gsApp.value("googleUrlInfo",googleUrlInfo);

gsApp.factory('googleSearchService', ['$http', 'googleUrlInfo', function($http, googleUrlInfo) {
    return {
        search: function(query, skipCnt, topCnt) {
            var url = "https://www.googleapis.com/customsearch/v1?key="+ googleUrlInfo.APIKEY + "&cx=" + googleUserInfo.ENGINEID + "&q=" + query + "&$skip=" + skipCnt +"&$top=" + topCnt;
            return $http.get(url,{
            	
                transformResponse: function (data, headers) {  
                	var results=[];       
                	var result = {};           
                    for (var i = 0; i<data.items.length; i++) {
                    	var item = data.items[i];
                    	result.title = item.title;
                    	result.description = item.snippet;
                    	result.link = item.link;
                    	result.engine = "Google";
                    	results.push(result);
                    };
                    var engineRes = {
                    	"engine": "Google",
                    	"results": results;
                    };
                    return engineRes;
                }
            });
        }
    };
}]);