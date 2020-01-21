function printReverse(list) {
	for (var i = list.length - 1; i >= 0; i--) {
		console.log(list[i]);
	}
}

function isUniform(list) {
	var res = true;
	list.forEach(function(l) {
		if (l !== list[0])
			res = false;		
	});
	return res;
}

function sumArray(list) {
	var res = 0;
	list.forEach(function(l) {
		res += l;
	});
	return res;
}

function max(list) {
	var res = list[0];
	list.forEach(function(l) {
		if (l > res)
			res = l;
	});
	return res;
}
