var res = false;
console.log('get id js')
function checkID(name,value){
	var JQelement = "input[name=" + name +"]";
	res = false;
	var data = {};
	data.id= $("input[name=Id]").val();
	console.log(data);
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

// function main(){
// 	if(res){
// 		document.findByID.submit();
// 	}
// 	else{
// 		document.addPaition.submit();
// 	}
// }


function mainControl($scope, $http) {
	var sendAjax = true;

	$scope.main = function(id){
		$("input[name=Id]").val(id);
		document.findByID.submit();
	}

	$scope.addPation = function(){
		console.log("id in main")
		document.addPaition.submit();
	}

	//$scope.pations = [];
	$scope.Angular=function(){
		$scope.pations = {};
		var data = {};
		var countEmptyfield = 0;
		var numberField = 5;
		data.PationId= $("input[name=PationId]").val();
		data.lNamne= $("input[name=lNamne]").val();
		data.FName= $("input[name=FName]").val();
		data.MNamne= $("input[name=MName]").val();
		data.BirthDay= $("input[name=BirthDay]").val();
		
		for(var key in data){
			if(data[key].length == 0){
				countEmptyfield++;
			}
		}
		console.log(countEmptyfield);
		if(countEmptyfield == numberField){
			sendAjax = false
			console.log('All fild empty')
			console.log(sendAjax);
		}
		else{
			sendAjax = true
			console.log('Not All fild')
			console.log(sendAjax);
		}
		//console.log(sendAjax);

		console.log(data);
 	 	if(sendAjax){
	 	 	$.ajax({ 
			url: 'http://localhost:3000/findPations',
			type: 'POST',
			cache: false, 
			data: data, 
			success: function(data){
				 console.log('success');
				 res = true;
				 sendAjax = false;
				 //console.log(sendAjax);
				 console.log(data);
				 $scope.$apply(function(){
				 	$scope.pations = data;
				 });
				 }
			,error: function(jqXHR, textStatus, err){
				console.log('fialed');
				res = false;
	           	}
		});
 	 }

 	 

	};


}



