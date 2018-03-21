
angular.module("lcars").service("connection", function() {
	var ws = new WebSocket("ws:\\localhost:8000");

	ws.onmessage = function(data) {
		console.log("Message: ", data);
	};
	
	ws.onclose = function(a,b) {
		console.log("Close: ", a, b);
	};
	
	ws.onerror = function(a,b) {
		console.log("Error: ", a, b);
	};
	
	ws.onopen = function(a,b) {
		console.log("Open: ", a, b);
	};
});
