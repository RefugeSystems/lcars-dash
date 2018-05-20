
angular.module("lcars").controller("missing", function($scope, lcSystem, lcSounds, $location) {
	lcSounds.play("chirp");
	
	$scope.navigation = function(path) {
		$location.path(path);
	};
});
