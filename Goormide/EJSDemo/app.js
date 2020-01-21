var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.send("Hi there, welcome to my EJS Demo!");
});


app.get("/posts", function(req, res) {
	var p =[
		{title: "Hahaha", author: "Susy"},
		{title: "Boring", author: "Bob"},
		{title: "ok", author: "Sam"}
	];
	res.render("posts.ejs", {posts: p});
});


app.listen(3000, function() {
	console.log("Server has started!");
});
