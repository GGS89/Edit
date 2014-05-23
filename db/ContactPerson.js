var db = require('./dbConect') 
var mongoose = require('mongoose');

var contactPersonSchema = new mongoose.Schema({
	lastName           : {type : String},
	firstName          : {type : String},
	fatherName         : {type : String},
	contactInformation : {type : String}
});

var ContactPerson = db.model("ContactPerson",contactPersonSchema);

module.exports = ContactPerson;