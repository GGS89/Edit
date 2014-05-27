var db = require('./dbConect') 
var mongoose = require('mongoose');

var PationIdSchema = new mongoose.Schema({
		Id : {type : Number}
});

var PationId = db.model("PationId",PationIdSchema);

module.exports = PationId;