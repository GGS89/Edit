var mongoose = require('mongoose');

console.log(mongoose.version);
var db = mongoose.createConnection('mongodb://localhost/testPationCreate');
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback () {
    console.log("Connected!")
});


module.exports = db;