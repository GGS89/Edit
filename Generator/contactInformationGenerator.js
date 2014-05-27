var mongoose = require('mongoose');
console.log(mongoose.version);
var db = mongoose.createConnection('mongodb://localhost/testPationSerch');
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback () {
    console.log("Connected!")
});

var contactInformationSchema = new mongoose.Schema({
	phoneNumberMobile  : {type:String},
	phoneNumberHome    : {type:String},
	email              : {type:String},
	skype              : {type:String}

});

var ContactInformation = db.model("ContactInformation",contactInformationSchema);


// generate race table
function generate(){

	
	var  alphas = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',
					'z','x','c','v','b','n','m'];
	var emailDomain = ['gmail.com','i.ua','mail.ru','yangex.ru'];
	var email = '';
	var skype = '';

	for(var i =0; i < 10; i++){
		email = '';
		skype = '';
		var phoneNumberMobileGen = '' +  (Math.round(Math.random()*(899)) + 100) + '-' 
								+  (Math.round(Math.random()*(899)) + 100) + '-' 
								+  (Math.round(Math.random()*(899)) + 100);
	    var phoneNumberHomeeGen = '(' +  (Math.round(Math.random()*(899)) + 100) + ') '
						 		+  (Math.round(Math.random()*(899)) + 100) + '-' 
						 		+  (Math.round(Math.random()*(8999)) + 1000);

		for(var i = 1; i < Math.round(Math.random()*(10)); i ++){
			var index = Math.round(Math.random()*(alphas.length-1))
			email = email + alphas[index];
		}
		var domainIndex = Math.round(Math.random()*(emailDomain.length-1))
		email = email + '@' + emailDomain[domainIndex];

		for(var i = 1; i < Math.round(Math.random()*(20)); i ++){
			var index = Math.round(Math.random()*(alphas.length-1))
			skype = skype + alphas[index];
		}
		skype = skype + Math.round(Math.random()*(10));



		var contactInformation = new ContactInformation({
			phoneNumberMobile  : phoneNumberMobileGen,
			phoneNumberHome    : phoneNumberHomeeGen,
			email              : email,
			skype              : skype

		});


		contactInformation.save(function (err, contactInformation) {
			if (err){
			     console.log("Something goes wrong with user " + contactInformation.email);
			    }
		});
		console.log(contactInformation._id);
	}
}
//generate()
ContactInformation.find({},function(err,res){
	console.log(res);
});
