
new Vue({
	"el": "#lcars",
	"data": {
		"message": "Hello world",
		"name": {
			"first": "John",
			"last": "doe"
		}
	},
	methods: {
		"test": function() {
			lcars.fullname = "hi there";
			console.log(lcars.fullname);
			console.log(lcars.name);
		}
	},
	computed: {
		"fullName": function() {
			return this.name.first + " " + this.name.last;
		}
	}
});
