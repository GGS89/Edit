
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
function main(){
	document.formPerson.submit();

}
