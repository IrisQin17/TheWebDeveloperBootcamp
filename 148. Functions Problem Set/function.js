function isEven(num) {
	return num % 2 === 0;
}

function factorial(num) {
	var res = 1;
	for (var i = 1; i <= num; i++) {
		res *= i;
	}
	return res;
}

function kababToSnake(str) {
	return str.replace("-", "_");
}
