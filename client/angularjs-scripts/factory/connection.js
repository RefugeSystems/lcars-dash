
angular.module("lcars").factory("Connection", function(log) {
	return function(configuration) {
		this.name = configuration.name;
		var ws = new WebSocket(configuration.url);

		ws.onmessage = function(data) {
			log.info("Message[" + this.name + "]: ", data);
		};

		ws.onclose = function() {
			log.info("Close[" + this.name + "]: " + this.name);
		};

		ws.onerror = function(error) {
			log.error("Error[" + this.name + "]: ", error);
		};

		ws.onopen = function() {
			log.info("Open[" + this.name + "]");
		};
	};
});
