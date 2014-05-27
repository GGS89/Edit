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

var Sex = db.model("Sex",sexSchema);
typeOfSex = ['male','female','hermaphrodite','Shemale'];

//generate sex table
function generate(){
	for(var i =0; i < typeOfSex.length; i++){
		var sex = new Sex({type:typeOfSex[i]});
		sex.save(function (err, sex) {
			if (err){
			     console.log("Something goes wrong with user " + sex.type);
			    }
		});
		console.log(sex);
	}
}
//generate()
Sex.find({},function(err,res){
	console.log(res[0]._id);
});
