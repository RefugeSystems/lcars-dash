angular.module("lcars").controller("matrix", function($scope, lcSystem, lcSounds) {
	lcSounds.play("open");

	$scope.matrix = cytoscape({
		"container": document.getElementById("matrix"),

		"zoom": 1,
		"pan": { x: 0, y: 0 },

		"minZoom": 0.00000001,
		"maxZoom": 10000000.0,
		"zoomingEnabled": true,
		"userZoomingEnabled": true,
		"panningEnabled": true,
		"userPanningEnabled": true,
		"boxSelectionEnabled": true
	});

	$scope.matrix.add([{
		"group": "nodes",
		"data": {
			"name": "A1",
			"label": "A1",
			"id": "n0"
		}
	}, {
		"group": "nodes",
		"data": {
			"name": "A2",
			"label": "A2",
			"id": "n1"
		}
	}, {
		"group": "nodes",
		"data": {
			"name": "A3",
			"label": "A3",
			"id": "n2"
		}
	}, {
		"group": "nodes",
		"data": {
			"name": "A4",
			"label": "A4",
			"id": "n3"
		}
	}, {
		"group": "edges",
		"data": {
			"id": "e0",
			"name": "Edge",
			"label": "Edge",
			"source": "n0",
			"target": "n1"
		}
	}]);
	
	$scope.layout = $scope.matrix.layout({
		"name": "cola",
		"infinite": true,
		"fit": true
	});
	
	$scope.layout.run();
	
	
});
