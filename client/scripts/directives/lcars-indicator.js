angular.module("lcars").directive("lcarsIndicator", function() {
	console.log("LCARS Indicator Directive Build");
	return {
		"templateUrl": "templates/indication.html",
	    "controller" : "indication",
		"scope": {
		}
	};
});
