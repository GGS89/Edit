var mongoose = require('mongoose');
console.log(mongoose.version);
var db = mongoose.createConnection('mongodb://localhost/testPationSerch');
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback () {
    console.log("Connected!")
});

var sexSchema = new mongoose.Schema({
	type : {type: String}
});

var raceSchema = new mongoose.Schema({
	type : {type: String}
});
var contactInformationSchema = new mongoose.Schema({
	phoneNumberMobile  : {type:String},
	phoneNumberHome    : {type:String},
	email              : {type:String},
	skype              : {type:String}

});

var contactPersonSchema = new mongoose.Schema({
	lastName           : {type : String},
	firstName          : {type : String},
	fatherName         : {type : String},
	contactInformation : {type:String}
});

var Sex = db.model("Sex",sexSchema);
var Race = db.model("Race",raceSchema);
var ContactInformation = db.model("ContactInformation",contactInformationSchema);
var ContactPerson = db.model("ContactPerson",contactPersonSchema);
// Sex.find({},function(err,res){
// 	console.log(res);
// })

var patientSchema = new mongoose.Schema({
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
	contactPerson     : {type:String}
});

var Patient = db.model("Patient",patientSchema);

function generatePatient(){
	var firstName = ['Sophia','Jacob','Isabella','William','Olivia','Ava','Noah','Michael','Alexander','Alexander','Chloe'];
	var fatherName = ['Alan','Allan','Micheal','James','Mikael','John','Jon','Andrew','Charles','Alexander','Patrick','Christopher','Paul','Richard','Antony'];
	var lastName = ['Smith','Anderson','Clark','Wright','Mitchell','Johnson','Thomas','Rodriguez','Lopez','Perez','Williams','White','Lewis','Hill','Roberts','Jones','Walker'];
	

	var dateOfBirth = new Date();
	
	var sexType = ['537dfc5af67cc2f80c68d5fd','537dfc5af67cc2f80c68d5ff','537dfc5af67cc2f80c68d600',
					'537dfc5af67cc2f80c68d5fe'];
	var raceType = ['537e039c0cdb386c0c3a34bd','537e039c0cdb386c0c3a34be','537e039c0cdb386c0c3a34bf'];
	var nationalType = ['Afghans','Albanians','Algerians','Americans',
						'Andorrans','Angolans','Ukrainians','Turks',
						'Poles','Hondurans','Icelanders','Irish','Kurds',
						'Lao','Chileans','Dutch','English','French citizens','Germans'];

	contactInformationID = ['537e0dbe0071ec68017d774c','537e0dca00004d9c0bd1df04',
							'537e0dca00004d9c0bd1df05','537e0dd00a405c3405757074',
							'537e0dd00a405c3405757075','537e0dea28bbcf0406252a63',
							'537e0dea28bbcf0406252a64','537e0dea28bbcf0406252a68',
							'537e0dea28bbcf0406252a69','537e0dea28bbcf0406252a65',
							'537e0dea28bbcf0406252a6a'];

	contactPersonID = ['537e121b0d4195240f7b21eb','537e121b0d4195240f7b21ec','537e121b0d4195240f7b21ec',
					   '537e121b0d4195240f7b21ee','537e121b0d4195240f7b21ef','537e121b0d4195240f7b21f0',
					   '537e121b0d4195240f7b21f0','537e121b0d4195240f7b21f1','537e121b0d4195240f7b21f2',
					   '537e121b0d4195240f7b21f3','537e121b0d4195240f7b21f4']
					

	for(var i = 0; i < 2; i++){
		firstNameIndex =Math.round(Math.random()*(firstName.length-1));
		fatherNameIndex = Math.round(Math.random()*(fatherName.length-1));
		lastNameIndex = Math.round(Math.random()*(lastName.length-1));

		dateOfBirth.setDate(Math.round(Math.random()*31));
		dateOfBirth.setMonth(Math.round(Math.random()*11));
		dateOfBirth.setYear(Math.round(Math.random()*114) + 1900);

		sexIndex = Math.round(Math.random()*(sexType.length-1));

		var SSNtype = '' +  (Math.round(Math.random()*(899)) + 100) + '-' 
						 + (Math.round(Math.random()*(99)) + 10) + '-'
						 + (Math.round(Math.random()*(899)) + 100);

		var passportNumberGen = '' + Math.round(Math.random()*(89999999)) + 10000000;
		raceIndex = Math.round(Math.random()*(raceType.length-1));
		nationalIndex = Math.round(Math.random()*(nationalType.length-1));
		contactInformationIndex = Math.round(Math.random()*(contactInformationID.length-1));
		contactPersonIDIndex = Math.round(Math.random()*(contactPersonID.length-1));

	var patient = new Patient({
			firstName          : firstName[firstNameIndex],
			fatherName         : fatherName[fatherNameIndex],
			lastName           : lastName[lastNameIndex],
			dateOfBirth        : dateOfBirth,
			sex                : sexType[sexIndex],
			SSN                : SSNtype,
			passportNumber     : passportNumberGen,
			race               : raceType[raceIndex],
			specialSigns       : '-',
		    national           : nationalType[nationalIndex],
			contactInformation : contactInformationID[contactInformationIndex],
			contactPerson      : contactPersonID[contactPersonIDIndex]});

	console.log(patient)
	patient.save(function (err, patient) {
		    if (err){
		        console.log("Something goes wrong with user ");
		    }
		});

	}
}

//generatePatient();//{firstName:'Olivia'}
Patient.find({ _id:'537e14c8fb40ff600f86adfd'},function (err, presons) {
        console.log(presons[0].contactInformation);
        ContactPerson.find({_id:presons[0].contactPerson},function(err,contactPerson){
        		console.log(contactPerson[0].contactInformation);
        		ContactInformation.find({_id:contactPerson[0].contactInformation},function(err,info){
        			console.log(info);
        		})
        });
 
 });

// Patient.update({firstName:'Olivia'},{$set: {firstName:"Gena"}},function(err, numAffected){
// 	console.log("Upade");
// });


// Patient.find({firstName:'Olivia'},function (err, presons) {
//         console.log(presons);
//  });