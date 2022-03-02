
function main(){
	let date = new Date();
	date = date.toLocaleTimeString();
	searchMode = document.getElementById("searchMode").value;
	unique = document.getElementById("uniqueness").value;
	mark = document.getElementById("mark");
	mainSize = parseInt(sizeRoom.innerText);
	solArr = [];
	words = [];
	chars = [];
	trashWords = [];
	if(stdin.value === "") {
		alert("You hadn't input any word!")
		return false;
	}
	stdin.value = stdin.value.toUpperCase();
	for(let i = 0; i < mainSize*(mainSize + 1); i++){
		if((i + 1) % (mainSize + 1) !== 0){
			let tmp = boardField.children[i];
			if(tmp.value === " ") tmp.value = "";
		}
	}
	for(let i = 0; i < mainSize; i++){
		chars.push([]);
		for(let j = 0; j < mainSize; j++){
			let tmp = boardField.children[(mainSize + 1)*i + j].value.toUpperCase(); //Also convert board
			if(tmp === "") tmp = "|";
			chars[i][j] = tmp;
		}
	}
	const raw = stdin.value.split(" ");
	for(let i = 0; i < raw.length; i++)
		if(raw[i] !== "")
			words.push(raw[i]);
	if(searchMode === "Curve Search") {
		if(unique === "Unique Solution"){
			curvedSolArr(); 
			uniSolDetail(date);
		}
		else{
			curvedSolArr();
			multiSolDetail(date);
		}
	}
	else{
		if(unique === "Unique Solution"){
			strokenUniSolArr(/*solArr*/);
			strokenTrashWord();
			uniSolDetail(date);
		}
		else{
			strokenMultiSolArr(/*solArr*/);
			strokenTrashWord();
			multiSolDetail(date);
		}
	}
	solutionHistory(date);
	console.log(solArr);
	console.log(trashWords);
	exeTimes++;
	return true;
}

function strokenMultiSolArr(){
	for(let k = 0; k < words.length; k++)
		for(let i = 0; i < mainSize; i++)
			for(let j = 0; j < mainSize; j++)
				for(let l = 0; l < 7; l++)
					if(checkPos(words[k], [i, j], direct[l]) == 1)
						solArr.push([words[k], [i, j], direct[l]]);
}

function strokenUniSolArr(){
	start: for(let k = 0; k < words.length; k++)
		for(let i = 0; i < mainSize; i++)
			for(let j = 0; j < mainSize; j++)
				for(let l = 0; l < 7; l++)
					if(checkPos(words[k], [i, j], direct[l])){
						solArr.push([words[k], [i, j], direct[l]]);
						continue start;
					}
}

function strokenTrashWord(){
	for(let i = 0; i < words.length; i++)
		if(findPos(words[i]) === -1)
			trashWords.push(words[i]);
}

function uniSolDetail(date /**/){
	let details = document.createElement("details");
	let summary = document.createElement("summary");
	let leftDiv = document.createElement("div"); 
	let rightDiv = document.createElement("div");
	let bigDiv = document.createElement("div");
	let block, butt;
	details.id = "mark";
	details.open = "true";
	newPIn(details, searchMode + ", " + unique);
	newLineIn(details, 1);
	if(mainSize <= 15){
		leftDiv.className = "leftDiv";
		rightDiv.className = "rightDiv";
	}
	summary.innerText = "Solution at " + date;
	for(let i = 0; i < mainSize; i++){
		for(let j = 0; j < mainSize; j++){
			block = document.createElement("input");
			block.type = "text";
			block.className = "input";
			block.value = chars[i][j];
			block.readOnly = "readonly";
			block.style.fontWeight = "bold";
			leftDiv.append(block);
		}
		newLineIn(leftDiv, 1);
	}
	for(let i = 0; i < words.length; i++){
		if(trashWords.includes(words[i]))
			continue;
		butt = document.createElement("button");
		butt.innerText = words[i];
		butt.style.fontWeight = "bold";
		if(searchMode === "Curve Search"){
			butt.addEventListener('mouseover', function(){
				const pos = findPos(words[i]);
				curvedHlUnit(leftDiv, solArr[pos].slice(1));
			});
		}
		else{
			butt.addEventListener('mouseover', function(){
				const pos = findPos(words[i]);
				hlUnit(leftDiv, words[i].length, solArr[pos][1], solArr[pos][2]);
			});
		}
		butt.addEventListener('mouseout', function(){
				cleanHl(leftDiv);
			});
		rightDiv.append(butt);
	}
	if(trashWords.length !== 0 && searchMode !== "Curve Search")
		newPIn(rightDiv, "No match found: " + trashWords);
	if(trashWords.length !== 0 && searchMode === "Curve Search")
		newPIn(rightDiv, "No match found/ Overcalculated: " + trashWords);
	details.append(summary);
	bigDiv.append(leftDiv);
	bigDiv.append(rightDiv);
	details.append(bigDiv);
	mainBody.replaceChild(details, mark);
	if(mainSize <= 15){
		const lH = leftDiv.offsetHeight; 
		const rH = rightDiv.offsetHeight;
		const stystr = Math.max(lH, rH) + 15 + "px";
		bigDiv.style.marginBottom = stystr;
	}
	else{
		leftDiv.style.resize = "vertical";
		leftDiv.style.overflow = "auto";
		leftDiv.style.border = "1px solid";
	}
}

function multiSolDetail(date){ 
	let details = document.createElement("details");
	let summary = document.createElement("summary");
	let leftDiv = document.createElement("div"); 
	let rightDiv = document.createElement("div");
	let bigDiv = document.createElement("div");
	let block, butt;
	details.id = "mark";
	details.open = "true";
	newPIn(details, searchMode + ", " + unique)
	newLineIn(details, 1);
	if(mainSize <= 15){
		leftDiv.className = "leftDiv";
		rightDiv.className = "rightDiv";
	}
	summary.innerText = "Solution at " + date;
	for(let i = 0; i < mainSize; i++){
		for(let j = 0; j < mainSize; j++){
			block = document.createElement("input");
			block.type = "text";
			block.className = "input";
			block.value = chars[i][j];
			block.readOnly = "readonly";
			block.style.fontWeight = "bold";
			leftDiv.append(block);
		}
		newLineIn(leftDiv, 1);
	}
	for(let i = 0; i < words.length; i++){
		if(trashWords.includes(words[i]))
			continue;
		newSpanIn(rightDiv, words[i] + " ");
		butt = document.createElement("button");
		butt.innerText = ">>";
		butt.style.fontWeight = "bold";
		if(searchMode === "Curve Search") 
			butt.onclick = function(){curvedHlNext(leftDiv, words[i]);};
		else
			butt.onclick = function(){hlNext(leftDiv, words[i]);};
		rightDiv.append(butt);
		butt = document.createElement("button");
		butt.innerText = "<<";
		butt.style.fontWeight = "bold";
		if(searchMode === "Curve Search")
			butt.onclick = function(){curvedHlPrev(leftDiv, words[i]);};
		else
			butt.onclick = function(){hlPrev(leftDiv, words[i]);};
		rightDiv.append(butt);
		newLineIn(rightDiv, 1);
	}
	if(trashWords.length !== 0 && searchMode !== "Curve Search")
		newPIn(rightDiv, "No match found: " + trashWords);
	if(trashWords.length !== 0 && searchMode === "Curve Search")
		newPIn(rightDiv, "No match found/ Overcalculated: " + trashWords);
	details.append(summary);
	bigDiv.append(leftDiv);
	bigDiv.append(rightDiv);
	details.append(bigDiv);
	mainBody.replaceChild(details, mark);
	if(mainSize <= 15){
		const lH = leftDiv.offsetHeight; 
		const rH = rightDiv.offsetHeight;
		const stystr = Math.max(lH, rH) + 15 + "px";
		bigDiv.style.marginBottom = stystr;
	}
	else{
		leftDiv.style.resize = "vertical";
		leftDiv.style.overflow = "auto";
		leftDiv.style.border = "1px solid";
	}
}

function solutionHistory(date){
	let ele = document.createElement("option");
	let text = "";
	ele.value = exeTimes + 1;
	ele.innerText = date;
	for(let i = 0; i < words.length; i++)
		text += words[i] + " ";
	for(let i = 0; i < chars.length; i++)
		for(let j = 0; j < chars.length; j++)
			text += chars[i][j];
	text += " " + mainSize;
	text += " " + (searchModes.indexOf(searchMode) + 1); 
	text += " " + (uniques.indexOf(unique) + 1);
	markOp.insertAdjacentElement("afterend", ele);
	newPAdj(markHis, text);
	{
		let butt = document.createElement("button");
		butt.innerText = "Copy Seed (at " + date + ")";
		butt.onclick= function(){
  			navigator.clipboard.writeText(history.children[2].innerText);
		}
		history.children[2].insertAdjacentElement("afterend", butt);
  	}
}

function checkPos(str, pos, dir){
	let r = 0;
	//Cont choice//
	if(searchMode === "Straight Search"){
		while(pos[0] < mainSize && pos[0] >= 0
			  && pos[1] < mainSize && pos[1] >= 0
			  && chars[pos[0]][pos[1]] === str[r]){
			r++;
			pos[0] = pos[0] + dir[0];
			pos[1] = pos[1] + dir[1];
		}
		return (r === str.length) ? true : false;
	}
	else if(searchMode === "Broken Search"){
		while(chars[pos[0]][pos[1]] === str[r] && r <= mainSize){
			r++;
			pos[0] = posRem(pos[0] + dir[0], mainSize);
			pos[1] = posRem(pos[1] + dir[1], mainSize);
		}
		return (r === str.length) ? true : false;
	}
}

function findPos(str){
	for(let i = 0; i < solArr.length; i++)
		if(str === solArr[i][0]) 
			return i;
	return -1;
}

function hlNext(div, str){
	cleanHl(div);
	if(oldStr != str) foundPos = -1;
	oldStr = str;
	for(let i = posRem(foundPos + 1, solArr.length);; i = posRem(i + 1, solArr.length)){
		if(solArr[i][0] === str){
			hlUnit(div, str.length, solArr[i][1], solArr[i][2]);
			foundPos = i;
			break;
		}
	}
}

function hlPrev(div, str){
	cleanHl(div);
	if(oldStr != str) foundPos = solArr.length;
	oldStr = str;
	for(let i = posRem(foundPos - 1, solArr.length);; i = posRem(i - 1, solArr.length)){
		if(solArr[i][0] === str){
			hlUnit(div, str.length, solArr[i][1], solArr[i][2]);
			foundPos = i;
			break;
		}
	}
}

function cleanHl(div){
	for(let i = 0; i < mainSize; i++)
		for(let j = 0; j < mainSize; j++){
			div.children[(mainSize + 1)*i + j].className = "input"; 
		}
}

//HERE
function hlUnit(div, len, pos, dir){
	let posY = pos[0];
	let posX = pos[1];
	div.children[(mainSize + 1)*posY + posX].className = "first";
	posY = posRem(posY + dir[0], mainSize);
	posX = posRem(posX + dir[1], mainSize);
	for(let i = 1; i < len; i++){
		div.children[(mainSize + 1)*posY + posX].className = "solved";
		posY = posRem(posY + dir[0], mainSize);
		posX = posRem(posX + dir[1], mainSize);
	}
}

function posRem(num, lim){
	if(lim === 1) return 0;
	if(num >= 0) return num%lim;
	return num%lim + lim;
}

function checkSym(str) {
    for(let i = 0; i < str.length / 2; i++) {
        if(str[i] != str[str.length - i - 1]) {
            return false;
        }
    }
    return true;
}

function checkIden(str) { 
    for(let i = 1; i < str.length; i++) {
        if(str[0] != str[i]) 
            return false;
    }
    return true;
}

