
angular.module("lcars")
.config(function($routeProvider, $locationProvider) {
	var time = {};
	time.init = Date.now();
	time.last = 0;
	time.next = 0;
	time.interval = 0;

	$routeProvider
	.when("/", {
		"templateUrl": "/templates/mapping.html",
		"controller": "graph",
		"time": time
	})
	.when("/matrix", {
		"templateUrl": "/templates/matrix.html",
		"controller": "matrix",
		"time": time
	})
	.when("/tests/sounds", {
		"templateUrl": "/templates/sounds.html",
		"controller": "sounding",
		"time": time
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
