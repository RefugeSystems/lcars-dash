
/**
 * 
 * @class Edge
 * @module factories
 */
angular.module("lcars").factory("Edge", function(lcSystem) {
	return function(edge) {
		this._original = edge;
		
		this.id = edge.id;
		this.name = edge.name;
		this.descriptions = edge.descriptions;
		this.removed = edge.removed;
		this.type = edge.type;
		this.subtype = edge.subtype;
		
		this.source = edge.source;
		this.target = edge.target;
		this.fields = edge.fields;
		
		this.creater = edge.creater;
		this.created = edge.created;
		this.modifier = edge.modifier;
		this.modified = edge.modified;
	};
});
