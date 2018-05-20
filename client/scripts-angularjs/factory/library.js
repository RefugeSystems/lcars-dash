
/**
 * 
 * @class Library
 * @constructor
 * @module lcars
 */
(function() {
	var libraries = {};
	var base = {};
	
	angular.module("lcars").factory("Library", function(lcSystem, log, Edge, Element, Session) {
		return function(set, configuration, session) {
			Object.assign(base, configuration);
			configuration = configuration || base;
			
			session = session || Session;
			
			if(libraries[set]) {
				return libraries[set];
			} else {
				libraries[set] = this;
				var library = this;
				var listeners = {};
				var events = [];
	
				this.on = function(key, listener) {
					listeners[key] = listeners[key] || [];
					listeners[key].push(listener);
				};
	
				var occur = function(key, data) {
					if(listeners[key]) {
						listeners[key].forEach(function(listener) {
							listener(data);
						});
					}
				};
	
				this.exception = null;
				this.elements = [];
				this.edges = [];
				this.keys = {};
				this.map = {};
	
				lcSystem.retrieve(set)
				.then(function(data) {
					if(data && data.elements && data.edges) {
						var load;
						data.edges.forEach(function(e) {
							load = new Edge(e);
						});
						data.elements.forEach(function(e) {
							load = new Element(e);
						});
					} else {
						library.exception = new Error("No Data");
						occur("error", library.exception);
					}
				})
				.catch(function(exception) {
					library.exception = exception;
					occur("error", library.exception);
				});
			}
		};
	});
})();
