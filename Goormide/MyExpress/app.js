var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
	var animal = req.params.animal.toLowerCase();
	var sound = "";
	if (animal === "pig")
		sound = "Oink";
	else if (animal === "cow")
		sound = "Moo";
	else if (animal === "dog")
		sound = "Woof Woof!";
	else
		res.send("Wrong animal!");
	res.send("The " + animal + " says '" + sound + "'");
});


app.get("/repeat/:word/:times", function(req, res) {
	var word = req.params.word;
	var times = Number(req.params.times);
	var result = ""
	for (var i = 0; i < times; i++)
		result = result + " " + word;
	res.send(result);
});


app.get("*", function(req, res) {
	res.send("Sorry, page not found... What are you doing with your life?");
});

// app.listen(process.env.PORT, process.env.IP, function() {
// 	console.log("Server has started!");
// });

app.listen(3000, function() {
	console.log("Server has started!");
});
