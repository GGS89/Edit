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
