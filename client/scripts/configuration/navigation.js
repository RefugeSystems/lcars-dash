
angular.module("lcars")
.config(function($routeProvider, $locationProvider) {
	var date = new Date();

	$routeProvider
	.when("/", {
		"templateUrl": "/templates/mapping.html",
		"controller": "graph",
		"init": date
	})
	.when("/map/charting", {
		"templateUrl": "/templates/mapping.html",
		"controller": "graph",
		"init": date
	})
	.when("/tests/sounds", {
		"templateUrl": "/templates/sounds.html",
		"controller": "sounding",
		"init": date
	})
	.when("/denied", {
		"templateUrl": "/templates/denied.html",
		"controller": "denied"
	})
	.when("/missing", {
		"templateUrl": "/templates/missing.html",
		"controller": "missing"
	})
	.otherwise("/missing");
	
//	$locationProvider
//	.html5Mode(true);
});
