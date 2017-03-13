var list = {};

var total = 0;
display();
function display(){
	document.getElementById('display').innerHTML = "Total: " + total;
	for(var x in list)
	{
		
		console.log(x+" "+list[x]);
	
	}
}

function add() {
	var ele = parseInt(document.getElementById('addele').value);
	if(ele == 1 || ele == 2 || ele == 5 || ele == 10 || ele == 20){
		document.getElementById('error1').style.visibility = 'hidden';
		list[ele]= (list[ele] ||0)+1;
		total = total+ele;
		display();
	}
	else{
		document.getElementById('error1').style.visibility = 'visible';
	}
	document.getElementById('addele').value = "";
	
}
function remove(){
	var ele = parseInt(document.getElementById('removeele').value);

	if(ele in list){	
		document.getElementById('error2').style.display = 'none';
		document.getElementById('error3').style.display = 'none';
		list[ele] = (list[ele] || 1)-1;
		total = total - ele;
		if(list[ele] == 0)
		{ 
			delete list[ele];
			
		}
		document.getElementById('removeele').value ="";
		display();
	}
	else{
		if(total == 0){
			document.getElementById('error3').style.display = 'inline';
		}else{
			document.getElementById('error2').style.display = 'inline';
		}
	}
		
}

function change(){
	var ele = parseInt(document.getElementById('changeele').value);
	var changetotal = 0;
	if(total < ele) {
		document.getElementById('error4').style.display = 'inline';
	}
	else {
		document.getElementById('error4').style.display = 'none';
		var denominationsIndex = {0:0, 1:0, 2:0, 3:0, 4:0};
		var array = {};
		for(var index in denominationsIndex) {
			if(ele !== 0){
				denominationsIndex[index] = giveChange(ele, parseInt(index));
				if(parseInt(index) === 0) {
					ele = ele - 20 * denominationsIndex[index];
					array[20] = denominationsIndex[index];
				}
				else if(parseInt(index) === 1){
					ele = ele - 10 * denominationsIndex[index];
					array[10] = denominationsIndex[index];
				}
				else if(parseInt(index) === 2){
					ele = ele - 5 * denominationsIndex[index];
					array[5] = denominationsIndex[index];
				}
				else if(parseInt(index) === 3){
					ele = ele - 2 * denominationsIndex[index];
					array[2] = denominationsIndex[index];
				}
				else if(parseInt(index) === 4) {
					ele = ele - 1 * denominationsIndex[index];
					array[1] = denominationsIndex[index];

				}
			}
			
		}
		if (ele !== 0) {
			document.getElementById('error4').style.display = 'inline';
		}
		else {
			document.getElementById('error4').style.display = 'none';
			for(var x in array){
				if(array[x] !== 0)
				{
					var para = document.createElement("P");
					var text = document.createTextNode(x + "-" + array[x]);
					para.appendChild(text);
					document.getElementById('changegiven').appendChild(para);

					console.log(x + ":" + array[x]);
					changetotal = changetotal + (x * array[x]) ;
					
				}

			}
			total = total - changetotal;
			console.log(total);
			console.log(changetotal);
			display();
		}
		
	}
	
}

function giveChange(ele,index) {
	var denominations = [20,10,5,2,1];
	var denomination = denominations[index];
	var noOfdenomination = parseInt(ele/denomination);
		if(noOfdenomination !== 0 && ele != denomination) {
			var eleCount = list[denomination];
			if(eleCount !== 0) {
				if(noOfdenomination < eleCount) {
					eleCount = eleCount - noOfdenomination;
					list[denomination] = eleCount;
					ele = ele - (denomination * noOfdenomination);
					return noOfdenomination;
				}
				else {
					ele = ele - (denomination * eleCount);
					list[denomination] = 0;
					return eleCount;
				}
			}
			else{
				return 0;
			}
		}
		else {
			return 0;
		}
}
