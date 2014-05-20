


exports.EditPage =function(req, res){
    var paitionId = req.body.Id;

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

}