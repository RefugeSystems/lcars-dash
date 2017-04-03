
/**
 * Provides static references to randomization functions.
 * @static
 * @class random
 * @module Augmentations
 * @namespace frame
 */
(function() {

	/**
	 * Quick reference array for generating random strings
	 * @private
	 * @property alphanumeric
	 * @type Array
	 */
	var alphanumeric = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

	var random = function(range, min) {
		if(min) {
			return Math.random() * range + min;
		}
		return Math.random() * range;
	};

	var randomInt = function(range, min) {
		if(min) {
			return Math.floor(Math.random() * range + min);
		}
		return Math.floor(Math.random() * range);
	};

	var randomString = function(len) {
		if(len) {
			var string = alphanumeric[randomInt(alphanumeric.length)];
			while(string.length < len) {
				string += alphanumeric[randomInt(alphanumeric.length)];
			}
			return string;
		} else {
			return null;
		}
	};

	var rID = function() {
		var rid = new Date().toString().hashCode();
		if(rid < 0) {
			rid = -1* rid;
		}
		rid = "" + rid;
		rid = randomString(32 - rid.length).concat(rid);
		return rid;
	};
	
	
	frame.random = {};
	
	frame.random.float = random;
	frame.random.int = randomInt;
	frame.random.string = randomString;
})();
