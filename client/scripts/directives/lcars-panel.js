angular.module("lcars").directive("lcarsPanel", function() {
	return {
		"templateUrl": function(elem, attr) {
			return "templates/" + attr.layout + ".html";
		},
		"controller": function(elem, attr) {
			return attr.controller;
		},
		"scope": {
			"_panel": this
		}
	};
});
