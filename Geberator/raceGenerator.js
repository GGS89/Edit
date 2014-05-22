var mongoose = require('mongoose');
console.log(mongoose.version);
var db = mongoose.createConnection('mongodb://localhost/testPationSerch');
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback () {
    console.log("Connected!")
});

var raceSchema = new mongoose.Schema({
	type : {type: String}
});

var Race = db.model("Race",raceSchema);
typeOfRace = ['White','Black','Asian'];

// generate race table
function generate(){
	for(var i =0; i < typeOfRace.length; i++){
		var race = new Race({type:typeOfRace[i]});
		race.save(function (err, race) {
			if (err){
			     console.log("Something goes wrong with user " + race.type);
			    }
		});
		console.log(race);
	}
}
//generate()
Race.find({},function(err,res){
	console.log(res[0]._id);
});
