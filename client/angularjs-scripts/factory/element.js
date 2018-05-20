
/**
 * 
 * @class Element
 * @module factories
 */
angular.module("lcars").factory("Element", function(lcSystem) {
	return function(element) {
		this._original = element;
		
		this.id = element.id;
		this.name = element.name;
		this.descriptions = element.descriptions;
		this.removed = element.removed;
		this.type = element.type;
		this.subtype = element.subtype;
		
		this.active = element.active;
		this.distress = element.distress;
		this.fields = element.fields;
		
		this.creater = element.creater;
		this.created = element.created;
		this.modifier = element.modifier;
		this.modified = element.modified;
	};
});
