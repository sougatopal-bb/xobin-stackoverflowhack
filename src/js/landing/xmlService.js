(function(){
	"use strict";

	angular.module("stackoverflowApp.landing")
		.factory('xmlService',xmlService);
    
    xmlService.$inject = ['$http','$q'];
	function xmlService($http,$q){
		console.log("hi");
		var service={
			'getPosts':getPosts,
			'postIsReady':postIsReady,
			'commentIsReady':commentIsReady,
			'getComment':getComment

		};

		var postPromise = $q.defer() ;
		var commentPromise = $q.defer() ;
		var badge,comment,post,postLinks,postHistory,tags,users,votes;
		var x2js = new X2JS();

		function postIsReady() {
            return postPromise.promise ;
        }
        function commentIsReady() {
            return commentPromise.promise ;
        }
		function fetchPost(){
			$http.get("xml/Posts.xml").then(function(response){
			post = x2js.xml_str2json(response.data);
			postPromise.resolve('Success') ;
			});
			$http.get("xml/Comments.xml").then(function(response){
			comment = x2js.xml_str2json(response.data);
			commentPromise.resolve('Success') ;
			console.log(comment);
			});
		}
		fetchPost();

		function getPosts(){
			return post.posts.row
		}
		function getComment(){
			return comment.comments.row
		}

		
		return service

	}
	
})();