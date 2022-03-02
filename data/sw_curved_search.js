function curvedSolArr(){
	let tmp = [];
	for(let i = 0; i < words.length; i++){
		tmp = rawStitch(words[i]);
		if(tmp.length > 0){
			for(let j = 0; j < tmp.length; j++){
				solArr.push([]);
				solArr[solArr.length - 1].push(words[i]);
				for(let k = 0; k < tmp[j].length; k = k + 2)
					solArr[solArr.length - 1].push(tmp[j].slice(k, k + 2));
			}
		}
		else trashWords.push(words[i]);
	}
}

function rawStitch(str){
	let resArr = [];
	for(let i = 0; i < mainSize; i++)
		for(let j = 0; j < mainSize; j++)
			if(chars[i][j] === str[0])
				resArr.push([i, j]);
	if(resArr.length > 0)
		for(let r = 1; r < str.length; r++){
			let oldLen = resArr.length;
			for(let i = 0; i < oldLen; i++){
				let tmp = [];
				let idk = resArr[i].length;
				for(let l = 0; l < 8; l++)
					if(checkAdjPos(resArr[i], direct[l], str[r])){
						tmp = resArr[i].slice();
						tmp.push(resArr[i][idk - 2] + direct[l][0], resArr[i][idk - 1] + direct[l][1]);
						resArr.push(tmp);
					}
			}
		resArr.splice(0, oldLen);
		if(resArr.length === 0) return [];
		if(resArr.length > 625) return [];
	}
	return resArr;
}

function checkAdjPos(arr, dir, char){
	let len = arr.length;
	let posY = arr[len - 2] + dir[0];
	let posX = arr[len - 1] + dir[1];
	if(posY < mainSize && posY >= 0 && posX < mainSize && posX >= 0 && chars[posY][posX] === char && checkPath(arr, [posY, posX]))
		return true;
	return false;
}

function checkPath(arr, nAE){
	for(let i = 0; i < arr.length; i = i + 2)
		if(arr[i] === nAE[0] && arr[i + 1] === nAE[1]) 
			return false;
	return true;
}

function curvedHlPrev(div, str){
	cleanHl(div);
	if(oldStr != str) foundPos = -1;
	oldStr = str;
	for(let i = posRem(foundPos + 1, solArr.length);; i = posRem(i + 1, solArr.length)){
		if(solArr[i][0] === str){
			curvedHlUnit(div, solArr[i].slice(1));
			foundPos = i;
			break;
		}
	}
}

function curvedHlNext(div, str){
	cleanHl(div);
	if(oldStr != str) foundPos = 1;
	oldStr = str;
	for(let i = posRem(foundPos - 1, solArr.length);; i = posRem(i - 1, solArr.length)){
		if(solArr[i][0] === str){
			curvedHlUnit(div, solArr[i].slice(1));
			foundPos = i;
			break;
		}
	}
}

function curvedHlUnit(div, arr){
	div.children[(mainSize + 1)*arr[0][0] + arr[0][1]].className = "first";
	for(let i = 1; i < arr.length; i++){
		div.children[(mainSize + 1)*arr[i][0] + arr[i][1]].className = "solved";
	}
}

