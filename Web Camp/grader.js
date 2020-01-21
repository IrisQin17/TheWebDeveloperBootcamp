function average(s) {
	var res = 0;
	s.forEach(function(g) {
		res += g;
	});
	return Math.round(res / s.length);
}

var scores = [90,98,89,100,100,86,94];
console.log(average(scores));