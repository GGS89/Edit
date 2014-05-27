var mongoose = require('mongoose');
console.log(mongoose.version);
var db = mongoose.createConnection('mongodb://localhost/testPationSerch');
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback () {
    console.log("Connected!")
});

var contactPersonSchema = new mongoose.Schema({
	lastName           : {type : String},
	firstName          : {type : String},
	fatherName         : {type : String},
	contactInformation : {type:String}
});

var ContactPerson = db.model("ContactPerson",contactPersonSchema);



// generate race table
function generate(){
	var firstName = ['Sophia','Jacob','Isabella','William','Olivia','Ava','Noah','Michael','Alexander','Alexander','Chloe'];
	var fatherName = ['Alan','Allan','Micheal','James','Mikael','John','Jon','Andrew','Charles','Alexander','Patrick','Christopher','Paul','Richard','Antony'];
	var lastName = ['Smith','Anderson','Clark','Wright','Mitchell','Johnson','Thomas','Rodriguez','Lopez','Perez','Williams','White','Lewis','Hill','Roberts','Jones','Walker'];
	
	contactInformationID = ['537e0dbe0071ec68017d774c','537e0dca00004d9c0bd1df04',
							'537e0dca00004d9c0bd1df05','537e0dd00a405c3405757074',
							'537e0dd00a405c3405757075','537e0dea28bbcf0406252a63',
							'537e0dea28bbcf0406252a64','537e0dea28bbcf0406252a68',
							'537e0dea28bbcf0406252a69','537e0dea28bbcf0406252a65',
							'537e0dea28bbcf0406252a6a'];
	for(var i = 0; i < 10; i++){
		firstNameIndex =Math.round(Math.random()*(firstName.length-1));
		fatherNameIndex = Math.round(Math.random()*(fatherName.length-1));
		lastNameIndex = Math.round(Math.random()*(lastName.length-1));
		contactInformationIndex = Math.round(Math.random()*(contactInformationID.length-1));

		var contactPerson = new ContactPerson({
			firstName          : firstName[firstNameIndex],
			fatherName         : fatherName[fatherNameIndex],
			lastName           : lastName[lastNameIndex],
			contactInformation : contactInformationID[contactInformationIndex]});

	console.log( contactPerson)
	contactPerson.save(function (err, contactPerson) {
			if (err){
			     console.log("Something goes wrong with user " + contactPerson.firstName);
			    }
	});

	}
}
//generate()
ContactPerson.find({},function(err,res){
	console.log(res);
});
