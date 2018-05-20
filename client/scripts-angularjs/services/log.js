
/**
 * 
 * @class log
 * @constructor
 * @module lcars
 */
angular.module("lcars").service("log", function() {
	var skip = function() {};
	var service = this;
	
	this.setConfiguration = function(settings) {
		if(!settings.log) {
			this.log = skip;
		} else {
			this.log = console.log;
		}
		if(!settings.debug) {
			this.debug = skip;
		} else {
			this.debug = console.debug;
		}
		if(!settings.trace) {
			this.trace = skip;
		} else {
			this.trace = console.trace;
		}
		if(!settings.info) {
			this.info = skip;
		} else {
			this.info = console.info;
		}
		if(!settings.warn) {
			this.warn = skip;
		} else {
			this.warn = console.warn;
		}
		if(!settings.error) {
			this.error = skip;
		} else {
			this.error = console.error;
		}
		if(!settings.fatal) {
			this.fatal = skip;
		} else {
			this.fatal = console.fatal;
		}
	};
	
	this.setConfiguration({});
	
	this.track = function(error) {
		service.error("Tracking Error:", error);
	};
});
