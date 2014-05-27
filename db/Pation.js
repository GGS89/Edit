var db = require('./dbConect') 
var mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
	patientId		  : {type:Number},
	lastName          : {type : String, defult:'Dou'},
	firstName         : {type : String, defult: 'John'},
	fatherName        : {type : String, defult:'-'},
	dateOfBirth       : {type : Date, defult: Date.now},
	sex               : {type:String},
	SSN               : {type:String},
	passportNumber    : {type:String},
	race              : {type:String},
	religion          : {type:String},
	specialSigns      : {type:String},
	national          : {type:String},
	contactInformation: {type:String},
	contactPerson     : {type:String},
	diagnosis         : {type:String}
});

var Patient = db.model("Patient",patientSchema);

module.exports = Patient;