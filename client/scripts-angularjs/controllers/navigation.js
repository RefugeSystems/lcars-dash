angular.module("lcars").controller("navigation", function($scope, $location, lcSounds) {
	$scope.navigation = function(path) {
//		lcSounds.play("chirp");
//		lcSounds.play("beep");
//		lcSounds.play("button");
		lcSounds.play("open");
		$location.path(path);
	};
});
