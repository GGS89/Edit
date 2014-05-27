function editControl($scope, $http) {

	$scope.editPation = function(){
		console.log('we can send form');
		document.updatePation.submit();
	}

	$scope.getInform = function(){
		var pationId =  $("input[name=Id]").val();
		var data ={};
		var dataSex = {};
		var dataRace = {};
		dataSex.sex = '';
		dataRace.race = '';
		data.pationId = pationId;
		$scope.races = {};
		$scope.sex = {};
		
		getRaceAndSex(dataSex,dataRace);
		$.ajax({ 
				url: 'http://localhost:3000/getPation',
				type: 'POST',
				cache: false, 
				data: data, 
				success: function(patient){
					 console.log('success getPation');
					 console.log(patient);
					 $scope.$apply(function(){
					 	$scope.patient = patient[0];
					 	dataSex.sex = $scope.patient.sex;
					 	dataRace.race = $scope.patient.race;
					 	getRaceAndSexPation(dataSex,dataRace);
					 	idContactInformation = patient[0].contactInformation;
					 	idContactPerson = patient[0].contactPerson;
					 	getContactInformation(idContactInformation,'patient');
					 	getContactPerson(idContactPerson);
					 });
					 }
				,error: function(jqXHR, textStatus, err){
					console.log('fialed');
					res = false;
		           	}
			});

	}



	function getRaceAndSex(dataSex,dataRace){
		$.ajax({ 
				url: 'http://localhost:3000/getRase',
				type: 'POST',
				cache: false, 
				data: dataRace, 
				success: function(race){
					 console.log('success getRase');
					 //console.log(sendAjax);
					 console.log(race);
					 $scope.$apply(function(){
					 	$scope.races = race;
					 });
					 }
				,error: function(jqXHR, textStatus, err){
					console.log('fialed');
					res = false;
		           	}
			});
		$.ajax({ 
				url: 'http://localhost:3000/getSex',
				type: 'POST',
				cache: false, 
				data: dataSex, 
				success: function(sex){
					 console.log('success getSex');
					 //console.log(sendAjax);
					 console.log(sex);
					 $scope.$apply(function(){
					 	$scope.sexs = sex;
					 });
					 }
				,error: function(jqXHR, textStatus, err){
					console.log('fialed');
					res = false;
		           	}
			});
		}

	function getRaceAndSexPation(dataSex,dataRace){
		$.ajax({ 
				url: 'http://localhost:3000/getPationRase',
				type: 'POST',
				cache: false, 
				data: dataRace, 
				success: function(race){
					 console.log('success getRase');
					 $('select option[value="'+race[0].type+'"]').attr("selected",true);
					 }
				,error: function(jqXHR, textStatus, err){
					console.log('fialed');
					res = false;
		           	}
			});
		$.ajax({ 
				url: 'http://localhost:3000/getPationSex',
				type: 'POST',
				cache: false, 
				data: dataSex, 
				success: function(sex){
					 console.log('success getSex');
					 $('select option[value="'+sex[0].type+'"]').attr("selected",true);
					 }
				,error: function(jqXHR, textStatus, err){
					console.log('fialed');
					res = false;
		           	}
			});
		}

	function getContactInformation(idContactInformation,person){
		var data = {};
		data.Id = idContactInformation;
		$.ajax({ 
				url: 'http://localhost:3000/getContactInformation',
				type: 'POST',
				cache: false, 
				data: data, 
				success: function(ContactInformation){
					 console.log('success ContactInformation');
					 console.log(ContactInformation);
					 if(person === 'patient'){
						 $scope.$apply(function(){
						 	$scope.ContactInformation = ContactInformation[0];
						 });
					 }
					 else{
					 	$scope.$apply(function(){
						 	$scope.ContactPerssonContInf = ContactInformation[0];
						 });
					 }
					 }
				,error: function(jqXHR, textStatus, err){
					console.log('fialed');
					res = false;
		           	}
			});
		}

	function getContactPerson(idContactPerson){
		var data = {};
		data.Id = idContactPerson;
		$.ajax({ 
				url: 'http://localhost:3000/getContactPerson',
				type: 'POST',
				cache: false, 
				data: data, 
				success: function(contactPerson){
					 console.log('success Contact Person');
					 console.log(contactPerson);
					 $scope.$apply(function(){
					 	$scope.contactPerson = contactPerson[0];
					 	var idContactInformation = contactPerson[0].contactInformation
					 	getContactInformation(idContactInformation,'contactPerson');
					 });
					 }
				,error: function(jqXHR, textStatus, err){
					console.log('fialed');
					res = false;
		           	}
			});
		}
	


}



function checkApha(name,line){
	var alphas = /^[а-яА-Яa-zA-Z\s]{3,16}$/;
	var JQelement = "input[name=" + name +"]";
	res = alphas.test(line);
	box_shadow(res,JQelement);
	return res;
}

function checkFirst(name,value){
	res = checkApha(name,value);
	fname = res;
}
function checkSecond(name,value){
	res = checkApha(name,value);
	sname = res;
}
function checkLast(name,value){
	res = checkApha(name,value);
	lname = res;
}

var dict = {
	lastname : checkLast,
	firstname : checkFirst,
	secondtname : checkSecond
}



var timeout_id = 'empty';
function timer(name){
	if(timeout_id != 'empty'){
		clearTimeout(timeout_id);
	}
	timeout_id = setTimeout(function(){
			var JQelement = "input[name=" + name +"]";
			var val = $(JQelement).val();
			dict[name](name,val);
		},300);
}

function box_shadow(res,JQelement){
	if (!(res)){
		$(JQelement).css('-webkit-box-shadow','0 0 8px red');
	}
	else{
		$(JQelement).css('-webkit-box-shadow','0 0 8px blue');
	}
}

function main(){
	console.log('edit');
	document.formPerson.submit();
}
