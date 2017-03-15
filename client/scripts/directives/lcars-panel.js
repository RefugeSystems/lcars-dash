angular.module("lcars").directive("lcarsPanel", function() {
	console.log("LCARS Panel Directive Build");
	return {
		"templateUrl": function(elem, attr) {
			console.log("Template: " + "templates/" + attr.layout + ".html");
			return "templates/" + attr.layout + ".html";
		},
	    "controller" : "@",
	    "name":"interface", 
		"scope": {
		}
	};
});
