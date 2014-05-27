var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes');
var users = require('./routes/user');
var pageId = require('./routes/idPage');
var editPation = require('./routes/Edit');

//dict
var Race = require('./db/Race');
var Sex = require('./db/Sex');


var Patient = require('./db/Pation');
var ContactInformation = require('./db/ContactInformation');
var ContactPerson = require('./db/ContactPerson');
var PationId = require('./db/PationId');

typeOfRace = ['White','Black','Asian'];

// generate race table
function generateRace(){
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
//generateRace()
// Race.find({},function(err,res){
//     console.log(res);
// });

typeOfSex = ['male','female','hermaphrodite','Shemale'];

//generate sex table
function generateSex(){
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
//generateSex()
// Sex.find({},function(err,res){
//     console.log(res);
// });
//Sex.find({_id:'537f0fad8dbffaf80b418c69'}).remove().exec();

//!!!!! Need add check
//init Id
// var id = new PationId({Id:100000});
// id.save(function(err,id){
//     if(err){
//         console.log("we get priblem with init PationId");
//     }
//     console.log(id);
// });

// PationId.find({},function(err,res){
//     console.log(res);
// })


var app = express();
app.use(bodyParser());


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(app.router);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/',function(req, res){
  res.render('id', {});}
);
app.post('/getPationId',bodyParser(), function(req, res){
    PationId.find({},function (err, pationId) {
        res.send(pationId);
    });
});


app.post('/getRase',bodyParser(), function(req, res){
    Race.find({},function (err, race) {
        res.send(race);
    });

});
app.post('/getSex',bodyParser(), function(req, res){
    Sex.find({},function (err, sex) {
        res.send(sex);
    });
});




app.post('/findPations',bodyParser(), function(req, res){
    //res.send('Test');

// data.lNamne= $("input[name=lNamne]").val();
//         data.FName= $("input[name=FName]").val();
//         data.MNamne= $("input[name=MName]").val();
//         data.BirthDay= $("input[name=BirthDay]").val();

    var pationID = req.body.id;
    var pationUserID = req.body.PationId;
    var pationLastName = req.body.lNamne;
    var pationFirstName = req.body.FName;
    var pationMiddleName = req.body.MNamne;
    var pationBirthDay = req.body.BirthDay;
    console.log(req.body);
    // console.log(pationLastName);
    // console.log(pationID);
    var re1 = new RegExp(pationLastName,'i');
    var re2 = new RegExp(pationFirstName,'i');
    var re3 = new RegExp(pationMiddleName,'i');
    var re4 = new RegExp(pationUserID);
    Patient.find({$and:[{patientId:re4},{lastName:re1},{firstName:re2},
                        {fatherName:re3}]},function (err, persons) {
        console.log(persons);
        res.send(persons);
    });

});


app.post('/editPations',function(req, res){
    var paitionId = req.body.Id;
    console.log(paitionId);
    Patient.find({_id:paitionId},function (err, persons) {
        console.log(persons);
        select = {
            Id : paitionId,
            lNamne : persons[0].lastName,
            fNamne : persons[0].firstName,
            mNamne : persons[0].middleName,
            diagnosis: persons[0].diagnosis,
            dataRegistartion: persons[0].dataRegistartion
        }
        console.log('select');
        console.log(select);
        res.render('edit',select);
    });

});


app.post('/', function(req, res){
    var patient = {
            firstName : req.body.firstname,
            middleName : req.body.secondtname,
            lastName : req.body.lastname,
            diagnosis : req.body.diagnosis,
            dataRegistartion :req.body.dataRegistartion
        };
    var patientId =  req.body.Id;
    console.log(patientId);
    console.log(patient);
    Patient.update({_id:patientId},{$set:patient},function(err, numAffected){
        console.log("Upade");
    });
    res.render('id',{});
});



app.post('/addPaition', function(req, res){
    res.render('add',{});
});

app.post('/createPation', function(req, res){
    console.log("Get form");
      Sex.find({type:req.body.sex},function (err, sex){
        console.log(sex[0]._id);
        Race.find({type:req.body.race},function(err,race){
            console.log(race[0]._id);
            var contactInformation = new ContactInformation({
                phoneNumberMobile  : req.body.phoneNumberMobile,
                phoneNumberHome    : req.body.phoneNumberHome,
                email              : req.body.email,
                skype              : req.body.skype
            });
            console.log(contactInformation);
            contactInformation.save(function (err, contactInformation){
                    var contactPersonInformation = new ContactInformation({
                                phoneNumberMobile  : req.body.phoneNumberMobileContactPe,
                                phoneNumberHome    : req.body.phoneNumberHomeContactPers,
                                email              : req.body.emailContactPerson,
                                skype              : req.body.skypeContactPerson
                                });
                    contactPersonInformation.save(function (err, contactPersonInformation){
                        var contactPerson = new ContactPerson({
                            firstName          : req.body.firstNameContactPerson,
                            fatherName         : req.body.fatherNameContactPerson,
                            lastName           : req.body.lastNameContactPerson,
                            contactInformation : contactPersonInformation._id});

                        contactPerson.save(function (err,contactPerson){
                            PationId.find({},function(err,id){
                                var pationID = id[0].Id + 1;
                                Sex.find({type : req.body.sex}, function(err,sex){
                                    Race.find({type:req.body.race},function(err,race){
                                        var patient = new Patient({
                                        patientId         : pationID,
                                        lastName          : req.body.lastName,
                                        firstName         : req.body.firstName,
                                        fatherName        : req.body.fatherName,
                                        dateOfBirth       : req.body.dateOfBirth,
                                        sex               : sex[0]._id,
                                        SSN               : req.body.SSN,
                                        passportNumber    : req.body.passportNumber,
                                        race              : race[0]._id,
                                        religion          : req.body.religion,
                                        specialSigns      : req.body.specialSigns,
                                        national          : req.body.national,
                                        contactInformation: contactInformation._id,
                                        contactPerson     : contactPerson._id,
                                        diagnosis         : ''
                                });
                                        PationId.update({Id:id[0].Id},{$set:{Id:pationID}},function(err, res){
                                                console.log("Upade");
                                                console.log(res);
                                        });

                                        patient.save(function(err,patient){
                                            console.log(patient);
                                            res.redirect('/')
                                        });
                                    });
                                });
                            })
                   });   
            });
         });
       });
});
});




/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
