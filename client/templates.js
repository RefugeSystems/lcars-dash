var __templifyTemplates = function() { beforeEach(inject(function($templateCache) {
	$templateCache.put("engineering.html", "\r\n<lcars-indicator class=\"lcars-info lcars-horizontal\" lcars-source=\"active.info\"></lcars-indicator>\r\n<lcars-status class=\"lcars-info lcars-horizontal\" lcars-source=\"active.status\"></lcars-indicator>\r\n\r\n<div class=\"lcars-panel\">\r\n\t<lcars-indicator class=\"lcars-info lcars-horizontal\" lcars-source=\"active.info\"></lcars-indicator>\r\n</div>\r\n");
	$templateCache.put("indication.html", "<div class=\"information\">\r\n\t<div ng-repeat=\"information in informations\">\r\n\t\t<div class=\"info\" ng-if=\"information.type === 'date'\">{{information.value | lcarsDate}}</div>\r\n\t\t<div class=\"info\" ng-if=\"information.type === undefined\">{{information.value}}</div>\r\n\t\t<div class=\"divider\" ng-if=\"!$last\"></div>\r\n\t</div>\r\n</div>\r\n");
	$templateCache.put("navigation.html", "");
}));};
