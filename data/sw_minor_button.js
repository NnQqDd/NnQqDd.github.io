function incSize(){
	let size = parseInt(sizeRoom.innerText);
	let ele;
	if(size >= 25) return false;
	for(let i = 0; i < size; i++){
        ele = document.createElement("input");
		ele.type = "text";
        ele.className = "input";
        ele.maxLength = "1";
		boardField.children[i*(size + 2) + (size - 1)].insertAdjacentElement("afterend", ele);
	} 
	for(let i = 0; i <= size; i++){
        ele = document.createElement("input");
		ele.type = "text";
        ele.className = "input";
        ele.maxLength = "1";
		boardField.append(ele);
	}
	newLineIn(boardField, 1);
	sizeRoom.innerText = ++size;
	return true;
}

function decSize(){
	let size = parseInt(sizeRoom.innerText);
	if(size <= 3) return false;
	for(let i = 0; i < size; i++)
		boardField.removeChild(boardField.children[i*size + (size - 1)]);
	for(let i = 0; i < size; i++)
        boardField.removeChild(boardField.lastElementChild);
	sizeRoom.innerText = --size;
}		

function clearBoard(){
	let size = parseInt(sizeRoom.innerText);
	for(let i = 0; i < size; i++)
		for(let j = 0; j < size; j++)
			boardField.children[(size + 1)*i + j].value = "";
}

function clearTxt(that){
	that.value = "";
}

function changeSearchMode(){
	for(let i = 0; i < 3; i++){
		if(document.getElementById("searchMode").value === searchModes[i]){
			document.getElementById("searchMode").value = searchModes[posRem(i + 1, 3)];
			break;
		}
	}
}

function changeUniqueMode(){
	for(let i = 0; i < 2; i++){
		if(document.getElementById("uniqueness").value === uniques[i]){
			document.getElementById("uniqueness").value = uniques[posRem(i + 1, 2)];
			break;
		}
	}
}

function loadHis(padDoc){
	if(reload.value === "0") return false; 
	let codedStr = history.children[2*(exeTimes - reload.value) + padDoc].innerText;
	return load(codedStr.split(" "), '');
	return true;
}

function load(strs, check){
	let len = strs.length;
	if(check === "yes" && !checkSeed(strs)){
		alert("Illegal seed!");
		return false;
	}
	let size = parseInt(strs[len - 3]);
	let smode = parseInt(strs[len - 2]); 
	let umode = parseInt(strs[len - 1]);
	let curSize = parseInt(document.getElementById("sizeRoom").innerText);
	stdin.value = "";	
	for(let i = 0; i < len - 4; i++) 
		stdin.value += strs[i] + " ";
	if(size > curSize)
		for(let i = 0; i < size - curSize; i++) incSize();
	else
		for(let i = 0; i < curSize - size; i++) decSize();
	document.getElementById("sizeRoom").innerText = strs[len - 3];
	for(let i = 0; i < size; i++)
		for(let j = 0; j < size; j++)
			boardField.children[(size + 1)*i + j].value = strs[len - 4][size*i + j];
	document.getElementById("searchMode").value = 
		searchModes[parseInt(strs[len - 2]) - 1];
	document.getElementById("uniqueness").value = 
		uniques[parseInt(strs[len - 1]) - 1];
	return true;
}

function checkSeed(strs){
	let len = strs.length;
	if(len < 5) return false;
	{
		let size = parseInt(strs[len - 3]);
		let smode = parseInt(strs[len - 2]); 
		let umode = parseInt(strs[len - 1]);
		if(isNaN(size) || isNaN(umode) || isNaN(smode))
			return false;
		if(strs[len - 4].length !== size*size) return false; 
		if(smode < 0 || smode > 3) return false;
		if(umode < 0 || umode > 2) return false;
	}
	return true;
}

function showHistory(){
	shHis = document.getElementById("shHis");
	if(shHis.innerText === "Show History"){
		shHis.innerText = "Hide History";
		history.style.display = "inline";
	}
	else{
		shHis.innerText = "Show History";
		history.style.display = "none";
	}
}

///
function randomf(){
	let rChars = [];
	let size = parseInt(sizeRoom.innerText);
	stdin.value = "";
	document.getElementById("searchMode").value = "Broken Search";
	
	for(let i = 0; i < size; i++){
		rChars.push([]);
		for(let j = 0; j < size; j++){
			let rPos = Math.floor(Math.random() * 25); 
			boardField.children[(size + 1)*i + j].value = alphabetArr[rPos];
			rChars[i][j] = alphabetArr[rPos];
		}
	}
	for(let i = 0; i < size/2; i++){
		let rPosX = Math.floor(Math.random() * (size - 1));
		let rPosY = Math.floor(Math.random() * (size - 1));
		let rDir = direct[Math.floor(Math.random() * 7)];
		let rLen = 1 + Math.random() * (size - 1);
		let rStr = "";
		if(rLen > size/2) rLen = size/2;
		for(let j = 0; j < rLen; j++){
			rStr += rChars[rPosY][rPosX];
			rPosX = posRem(rPosX + rDir[0], size);
			rPosY = posRem(rPosY + rDir[1], size);
		}
		stdin.value += rStr + " ";
	}
}
