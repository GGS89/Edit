var db = require('./dbConect') 
var mongoose = require('mongoose');

var sexSchema = new mongoose.Schema({
	type : {type: String}
});

var Sex = db.model("Sex",sexSchema);

module.exports = Sex;