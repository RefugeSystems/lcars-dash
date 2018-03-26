
angular.module("lcars")
.config(function($routeProvider, $locationProvider) {
	var time = {};
	time.init = Date.now();
	time.last = 0;
	time.next = 0;
	time.interval = 0;
	
	var configuration = new Promise(function(done, fail) {
		$.getJSON("/configuration.json")
		.then(function(configuration) {
			configuration = configuration || {};
			done(configuration);
		})
		.catch(fail);
	});
	

	$routeProvider
	.when("/", {
		"templateUrl": "/templates/mapping.html",
		"controller": "graph",
		"resolve": {
			"configuration": function() {
				return configuration;
			}
		}
	})
	.when("/resources/matrix", {
		"templateUrl": "/templates/matrix.html",
		"controller": "matrix",
		"resolve": {
			"configuration": function() {
				return configuration;
			}
		}
	})
	.when("/resources/manage/:set", {
		"templateUrl": "/templates/manage.html",
		"controller": "resource",
		"resolve": {
			"configuration": function() {
				return configuration;
			}
		}
	})
	.when("/resources/:display/:set", {
		"templateUrl": "/templates/display.html",
		"controller": "resource",
		"resolve": {
			"configuration": function() {
				return configuration;
			}
		}
	})
	.when("/resources/manage/:set", {
		"templateUrl": "/templates/manage.html",
		"controller": "resource",
		"resolve": {
			"configuration": function() {
				return configuration;
			}
		}
	})
	.when("/tests/sounds", {
		"templateUrl": "/templates/sounds.html",
		"controller": "sounding"
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
});
