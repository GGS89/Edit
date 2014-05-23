var db = require('./dbConect') 
var mongoose = require('mongoose');

var raceSchema = new mongoose.Schema({
	type : {type: String}
});

var Race = db.model("Race",raceSchema);

module.exports = Race;