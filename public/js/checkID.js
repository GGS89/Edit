var res = false;
console.log('get id js')
function checkID(name,value){
	var JQelement = "input[name=" + name +"]";
	res = false;
	var data = {};
	data.id= $("input[name=Id]").val();
	console.log(data);
	$.ajax({ 
		url: 'http://localhost:3000/ajax',
		type: 'POST',
		cache: false, 
		data: data, 
		success: function(data){
			 console.log('we get');
			 console.log(data);
			 $("input[name=lastname]").val(data.lNamne);
			 $("input[name=firstname]").val(data.fNamne);
			 $("input[name=secondtname]").val(data.mNamne);
			 $("input[name=diagnosis]").val(data.diagnosis);
			 $("input[name=dataRegistartion]").val(data.dataRegistartion);
			 res = true;
			 }
		,error: function(jqXHR, textStatus, err){
			console.log('fialed');
			res = false;
           	}
});

	if (value.length == 24) {
		res = true;
	}
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

function main(){
	if(res){
		document.findByID.submit();
	}
	else{
		document.addPaition.submit();
	}
}


function mainControl($scope, $http) {

	//$scope.pations = [];
	$scope.Angular=function(){
		console.log('Angular');
		var data = {};
		data.id= $("input[name=Id]").val();
		console.log(data.id);
 	 	
 	 	dt = $.ajax({ 
		url: 'http://localhost:3000/ajax',
		type: 'POST',
		cache: false, 
		data: data, 
		success: function(data){
			 console.log('we get');
			 $("input[name=lastname]").val(data.lNamne);
			 $("input[name=firstname]").val(data.fNamne);
			 $("input[name=secondtname]").val(data.mNamne);
			 $("input[name=diagnosis]").val(data.diagnosis);
			 $("input[name=dataRegistartion]").val(data.dataRegistartion);
			 res = true;
			 $scope.$apply(function(){
			 	$scope.pations = [data];
			 });
			 }
		,error: function(jqXHR, textStatus, err){
			console.log('fialed');
			res = false;
           	}
	});

 	 

	};


}



