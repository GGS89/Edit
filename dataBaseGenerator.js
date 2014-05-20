var mongoose = require('mongoose');
console.log(mongoose.version);
var db = mongoose.createConnection('mongodb://localhost/testPation');
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback () {
    console.log("Connected!")
});
var patientSchema = new mongoose.Schema({
	firstName : { type : String, defult: 'John'},
	middleName : {type : String, defult:'-'},
	lastName : {type : String, defult:'Dou'},
	diagnosis :{type:String},
	dataRegistartion: {type:String},
});
var Patient = db.model("Patient",patientSchema);

function generatePatient(){
	var firstName = ['Sophia','Jacob','Isabella','William','Olivia','Ava','Noah','Michael','Alexander','Alexander','Chloe'];
	var middleName = ['Alan','Allan','Micheal','James','Mikael','John','Jon','Andrew','Charles','Alexander','Patrick','Christopher','Paul','Richard','Antony'];
	var lastName = ['Smith','Anderson','Clark','Wright','Mitchell','Johnson','Thomas','Rodriguez','Lopez','Perez','Williams','White','Lewis','Hill','Roberts','Jones','Walker'];
	var diagnosis = ['Abdomen Picture','Acute Sinusitis Symptoms and Signs','Acute Valley Fever','Ad14','Adult Vaccination: New Guidelines',
	'Annual Beaches Report Finds Water Quality Lacking','Americans Sickened by Deadly E coli in Germany','Americans Encouraged to Get Flu Vaccine',
	'American Trypanosomiasis','All U.S. Adults Should Get Whooping Cough Shot','Airborne Fungus Expected to Spread in U.S.','Agranulocytosis',
	'African Chimps Carry Drug-Resistant, Human Staph','Aeromonas hydrophila'];

	var dataRegistartion = ['10/05/2014','16/01/2014','10/12/2011','10/05/2010','10/12/2014','11/01/2008','12/01/2014','20/05/2014','10/05/2013'];


	for(var i = 0; i < 100; i++){
		firstNameIndex =Math.round(Math.random()*(firstName.length-1));
		middleNameIndex = Math.round(Math.random()*(middleName.length-1));
		lastNameIndex = Math.round(Math.random()*(lastName.length-1));
		diagnosisIndex = Math.round(Math.random()*(diagnosis.length-1));
		dataRegistartionIndex = Math.round(Math.random()*(dataRegistartion.length-1));

	var patient = new Patient({
			firstName : firstName[firstNameIndex],
			middleName : middleName[middleNameIndex],
			lastName : lastName[lastNameIndex],
			diagnosis : diagnosis[diagnosisIndex],
			dataRegistartion : dataRegistartion[dataRegistartionIndex]})

	console.log( patient.firstName)
		patient.save(function (err, patient) {
		    if (err){
		     //   console.log("Something goes wrong with user " + patient.firstName);
		    }
			});

	}
}

generatePatient();//{firstName:'Olivia'}
Patient.find({firstName:'Olivia'},function (err, presons) {
        console.log(presons);
 
 });

Patient.update({firstName:'Olivia'},{$set: {firstName:"Gena"}},function(err, numAffected){
	console.log("Upade");
});


Patient.find({firstName:'Olivia'},function (err, presons) {
        console.log(presons);
 });