console.log("Hi there uwu");
const mainBody = document.getElementById("mainBody");
const sizeRoom = document.getElementById("sizeRoom");
const boardField = document.getElementById("boardField");
var searchMode = document.getElementById("searchMode").value;
var unique = document.getElementById("uniqueness").value;
const reload = document.getElementById("reload");
const stdin = document.getElementById("stdin");
const seed = document.getElementById("seed");
var mark = document.getElementById("mark");
const history = document.getElementById("history");
const markHis = document.getElementById("markHis");
const markOp = document.getElementById("markOp");
var exeTimes = 0, solArr = [], words = [], trashwords = [], chars = [], oldStr = "", foundPos, mainSize; 
const alphabetArr = ["A","B","C","D","E","F","G","H","I","J","K","L",
					"M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const direct = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]; //Y X
const searchModes = ["Straight Search", "Broken Search", "Curve Search"];
const uniques = ["Unique Solution", "Multiple Solution"];
for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){
        	let ele = document.createElement("input");
			ele.type = "text";
        	ele.className = "input";
        	ele.maxLength = "1";
			boardField.append(ele);
	} 
	ele = document.createElement("br");
	boardField.append(ele);
}

function newLineIn(obj, times){
	let _ele_;
	for(let i = 0; i < times; i++){
		_ele_ = document.createElement("br");
		obj.append(_ele_);
	}	
}

function newSpanIn(obj, contents){
	let _ele_;
	_ele_ = document.createElement("span");
	_ele_.innerText = contents;
	obj.append(_ele_);
}

function newPIn(obj, contents){
	let _ele_;
	_ele_ = document.createElement("p");
	_ele_.innerText = contents;
	obj.append(_ele_);
}

function newPAdj(obj, contents){
	let _ele_;
	_ele_ = document.createElement("p");
	_ele_.innerText = contents;
	obj.insertAdjacentElement("afterend", _ele_);
}

function newHrIn(obj){
	let _ele_;
	_ele_ = document.createElement("hr");
	obj.append(_ele_);
}