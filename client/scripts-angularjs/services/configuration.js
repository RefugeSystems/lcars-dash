
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
		var track = {};
		
		var configuration = new Promise(function(done, fail) {
			track._done = done;
			track._fail = fail;
		});
		
		request.then(function(configuration) {
			Object.assign(service, configuration);
			track._done(service);
		})
		.catch(function(err) {
			log.track(err);
			track._fail(err);
		});
		
		this.configured = function() {
			return configuration;
		};
	});
})();
