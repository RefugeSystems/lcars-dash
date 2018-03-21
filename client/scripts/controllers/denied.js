
angular.module("lcars").controller("denied", function($scope, lcSystem, lcSounds, $location) {
	lcSounds.play("error");
	
	$scope.navigation = function(path) {
		$location.path(path);
	};
});
