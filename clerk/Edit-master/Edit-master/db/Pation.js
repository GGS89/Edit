var db = require('./dbConect') 
var mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
    firstName : { type : String, defult: 'John'},
    middleName : {type : String, defult:'-'},
    lastName : {type : String, defult:'Dou'},
    diagnosis :{type:String},
    dataRegistartion: {type:String},
});
var Patient = db.model("Patient",patientSchema);

module.exports = Patient;