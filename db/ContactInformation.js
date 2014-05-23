var db = require('./dbConect') 
var mongoose = require('mongoose');

var contactInformationSchema = new mongoose.Schema({
	phoneNumberMobile  : {type:String},
	phoneNumberHome    : {type:String},
	email              : {type:String},
	skype              : {type:String}

});

var ContactInformation = db.model("ContactInformation",contactInformationSchema);

module.exports = ContactInformation;