var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
		{name: "Salmon Creek", image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
		{name: "Granite Hill", image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80"},
		{name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"},
	{name: "Salmon Creek", image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
		{name: "Granite Hill", image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80"},
		{name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"}
	];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds:campgrounds});
	
});

app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCamp = {name: name, image: image};
	campgrounds.push(newCamp);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

app.listen(3000, function() {
	console.log("The YelpCamp Server Has Started!");
});