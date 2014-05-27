function addControl($scope, $http) {


	$scope.getInform = function(id){
		var dataSex = {};
		var dataRace = {};
		dataSex.sex = '';
		dataRace.race = '';

		$scope.races = {};
		$scope.sex = {};
		$scope.pationId = {};


		$.ajax({ 
				url: 'http://localhost:3000/getPationId',
				type: 'POST',
				cache: false, 
				data: '', 
				success: function(pationId){
					 console.log('success');
					 //console.log(sendAjax);
					 console.log(pationId);
					 $scope.$apply(function(){
					 	$scope.pationId = parseInt(pationId[0].Id) + 1;
					 });
					 }
				,error: function(jqXHR, textStatus, err){
					console.log('fialed');
					res = false;
		           	}
			});

		$.ajax({ 
				url: 'http://localhost:3000/getRase',
				type: 'POST',
				cache: false, 
				data: dataRace, 
				success: function(race){
					 console.log('success');
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
					 console.log('success');
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

	$scope.main = function(){
		console.log("Main worked");
		document.formCreatPerson.submit();
	}


};



/*
function checkID(name,value){
	var JQelement = "input[name=" + name +"]";
	res = false;
	if (value.length > 10) {
		res = true;
	}
	console.log(res)
	box_shadow(res,JQelement);
}
var timeout_id = 'empty';
function timer(name){
	if(timeout_id != 'empty'){
		clearTimeout(timeout_id);
	}
	timeout_id = setTimeout(function(){
			var JQelement = "input[name=" + name +"]";
			var val = $(JQelement).val();
			checkID(name,val);
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
*/

