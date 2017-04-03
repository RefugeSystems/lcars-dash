
angular.module("lcars").config(function($routeProvider) {
	var date = new Date();
	console.log("LCARS Loading - " + date.toString());
	
	$routeProvider
	.when("/", {
		"templateUrl": "/templates/indication.html"
//		,"controller": "home"
//		,"page": "home"
//		,"system": anchor
	})
	.otherwise("/missing");
});
