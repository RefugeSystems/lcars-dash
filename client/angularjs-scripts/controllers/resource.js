
angular.module("lcars").controller("resource", function($scope, $location, $routeParams, Library, lcSounds, lcSystem) {
	lcSounds.play("open");
	
	console.log("Scope: ", $scope.$resolve);
	
	$scope.library = null;
//	$scope.configuration = $scope.$resolve.configuration;
//	$scope.session = $scope.$resolve.session;
	$scope.display = $routeParams.display;
	$scope.set = $routeParams.set;
	
	$scope.open = function(set) {
		$scope.set = set;
		$scope.library = new Library(set, $scope.configuration, $scope.session);
	};
	
	console.log("Scope: ", $scope);
});
