
angular.module("lcars").controller("general", function($scope, lcSystem, lcSounds, $location) {
	$scope.navigation = function(path) {
//		lcSounds.play("chirp");
		lcSounds.play("close");
//		lcSounds.play("button");
//		lcSounds.play("open");
		$location.path(path);
	};
});
