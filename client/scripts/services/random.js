
/**
 * Provides references to randomization functions.
 * @class random
 * @module services
 */
angular.module("lcars").service("lcRandom", function() {
	var service = this;
	
	/**
	 * Quick reference array for generating random strings
	 * @private
	 * @property alphanumeric
	 * @type Array
	 */
	var alphanumeric = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

	this.number = function(range, min) {
		if(min) {
			return Math.random() * range + min;
		}
		return Math.random() * range;
	};

	this.integer = function(range, min) {
		if(min) {
			return Math.floor(Math.random() * range + min);
		}
		return Math.floor(Math.random() * range);
	};

	this.string = function(len) {
		if(len) {
			var string = alphanumeric[service.integer(alphanumeric.length)];
			while(string.length < len) {
				string += alphanumeric[service.integer(alphanumeric.length)];
			}
			return string;
		} else {
			return null;
		}
	};
});
