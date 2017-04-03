
/**
 * 
 * 
 * 
 */
module.exports = function(handler) {
	var configuration = require("./conf/configuration.js");
	var translation = require("./conf/translation.js");
	var http, server;
	
	if(configuration.listening.certificate) {
		http = require("https");
	} else {
		http = require("http");
	}
	
	var server = http.createServer();
	var sokcet = require("socket.io");
	var io = io(server);
	
	io.on("connection", function(socket) {
		
		/**
		 * 
		 * @event access
		 * @param {Petition}
		 * 
		 */
		socket.on("access", function(data) {
			
		});
		
		socket.on("retrieval", function(data) {
			
		});
		
		socket.on("create", function(Data) {
			
		});
		
		socket.on("read", function(Data) {
			
		});
		
		socket.on("update", function(Data) {
			
		});
		
		socket.on("delete", function(Data) {
			
		});
	});
};
