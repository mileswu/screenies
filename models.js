var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var imageSchema = new Schema({
	title: String,
	description : String,
	filename : String,
	author : ObjectId,
	date: Date
});

var comparisonSchema = new Schema({
	title : String,
	images : [imageSchema],
	views: Number,
	author: ObjectId,
	date: Date
});


mongoose.model('Comparison', comparisonSchema);

/*export.Comparison = function(db) { 
	return db.model('Document');
}*/

