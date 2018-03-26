angular.module("lcars").directive("lcarsPanel", function() {
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
