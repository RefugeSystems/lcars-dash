
/**
 * 
 * @class configuration
 * @constructor
 * @module lcars
 */
(function() {
	var request = $.getJSON("/configuration.json");
	angular.module("lcars").service("configuration", function(log) {
		var service = this;
		
		request.then(function(configuration) {
			Object.assign(service, configuration);
		})
		.catch(log.track);
	});
})();
