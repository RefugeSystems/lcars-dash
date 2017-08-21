/* Used for base line tests to establish baseline functionality */

describe("Assumptions for unit testing", function() {
	
	describe("Jasmine", function() {
		it("Exists", function() {
			expect(true).toBe(true);
		});
	});
	
	describe("Promises", function() {
		it("Exists", function() {
			expect(Promise).toBeDefined();
		});
		
		it("Execute successfully", function(done) {
			var promise = new Promise(function(pass) {
				pass();
			});
			
			promise.then(function() {
				done();
			});
		});
	});
	
	describe("jQuery", function() {
		it("Exists", function() {
			expect($).toBeDefined();
		});
	});
	
	describe("AngularJS", function() {
		it("Exists", function() {
			expect(angular).toBeDefined();
			expect(angular.module).toBeDefined();
		});
		
		it("Can mock appropriately", function() {
			var testing;
			
			module(function($provide) {
				$provide.value("fake", {
					"faked": 10
				});
				
				$provide.value("another", {
					"fake": function() {
						return 20;
					}
				});
			});
			
			inject(function($injector) {
				testing = $injector.get("another");
			});

			expect(testing.fake()).toBe(20);
		});
	});
});