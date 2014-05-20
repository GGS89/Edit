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


var Patient = require('./db/Pation') 

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


app.post('/ajax',bodyParser(), function(req, res){
    //res.send('Test');
    var pationID = req.body.id
    console.log("===========================================");
    console.log(pationID);
    //res.send("good");
    Patient.find({_id:pationID},function (err, persons) {
                select = {
                    Id : pationID,
                    lNamne : persons[0].lastName,
                    fNamne : persons[0].firstName,
                    mNamne : persons[0].middleName,
                    diagnosis: persons[0].diagnosis,
                    dataRegistartion: persons[0].dataRegistartion
                }
                //console.log('select');
                console.log(select);
                res.send(select);
    });

   
});


app.post('/edit',function(req, res){
    var paitionId = req.body.Id;
    console.log(req.body.Id);
    Patient.find({_id:paitionId},function (err, persons) {
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



app.post('/add', function(req, res){
    res.render('add',{});
});
app.post('/addPerson', function(req, res){
   var patient = new Patient({
            firstName : req.body.firstname,
            middleName : req.body.secondtname,
            lastName : req.body.lastname,
            diagnosis : req.body.diagnosis,
            dataRegistartion :req.body.dataRegistartion
        });
    console.log(patient);
    patient.save(function (err, patient) {
        if (err){
               console.log("Something goes wrong with user " + patient.firstName);
        }
    });
    res.redirect('/');
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
