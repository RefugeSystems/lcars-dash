
/**
 * 
 * @class connection
 * @constructor
 * @param log
 * @returns
 */
angular.module("lcars").service("connection", function(log) {
	var ws = new WebSocket("ws:\\localhost:8000");

	ws.onmessage = function(data) {
		log.info("Message: ", data);
	};

	ws.onclose = function() {
		log.warn("Close");
	};

	ws.onerror = function(error) {
		log.error("Error: ", error);
	};

	ws.onopen = function(connection) {
		log.info("Open: ", connection);
	};
});
