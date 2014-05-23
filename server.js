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



var Patient = require('./db/Pation');
var ContactInformation = require('./db/ContactInformation');
var ContactPerson = require('./db/ContactPerson');

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
    var pationLastName = req.body.lNamne;
    var pationFirstName = req.body.FName;
    var pationMiddleName = req.body.MNamne;
    var pationBirthDay = req.body.BirthDay;

    console.log(pationLastName);
    console.log(pationID);
    var re1 = new RegExp(pationLastName);
    var re2 = new RegExp(pationFirstName);
    var re3 = new RegExp(pationMiddleName);
    //var re = new RegExp(pationLastName);
    Patient.find({$and:[{lastName:re1},{firstName:re2},{middleName:re3}]},function (err, persons) {
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
   // var patient = new Patient({
   //          lastName          : {type : String, defult:'Dou'},
   //          firstName         : {type : String, defult: 'John'},
   //          fatherName        : {type : String, defult:'-'},
   //          dateOfBirth       : {type : Date, defult: Date.now},
   //          sex               : {type:String},
   //          SSN               : {type:String},
   //          passportNumber    : {type:String},
   //          race              : {type:String},
   //          religion          : {type:String},
   //          specialSigns      : {type:String},
   //          national          : {type:String},
   //          contactInformation: {type:String},
   //          contactPerson     : {type:String}
   //      });
    console.log(req.body);
    // patient.save(function (err, patient) {
    //     if (err){
    //            console.log("Something goes wrong with user " + patient.firstName);
    //     }
    // });
    // res.redirect('/');
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
