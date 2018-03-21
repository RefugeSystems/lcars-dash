
angular.module("lcars").controller("sounding", function($scope, lcSystem, lcSounds) {
	lcSounds.play("button");
	$scope.play = lcSounds.play;
});
