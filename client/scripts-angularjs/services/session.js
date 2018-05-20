
/**
 * 
 * @class Session
 * @constructor
 * @param log
 * @returns
 */
angular.module("lcars").service("Session", function(log) {
	var sessionKey = "session:key";
	
	var session = localStorage.getItem(sessionKey);
	if(session) {
		session = JSON.parse(session);
	} else {
		session = {};
	}
	
	this._set = function(data) {
		localStorage.setItem(sessionKey, JSON.stringify(data));
		Object.assign(this, data);
	};
	
	Object.assign(this, session);
});
