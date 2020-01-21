var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground");

// INDEX ROUTE - show all campgrounds
router.get("/", function(req, res) {
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});	
});

//CREATE ROUTE - add new campground to database
router.post("/", function(req, res) {
	// get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCamp = {name: name, image: image, description: desc};
	Campground.create(newCamp, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	})
});

//NEW ROUTE - show form to create new campground
router.get("/new", function(req, res) {
	res.render("campgrounds/new");
});

// SHOW ROUTE - show more info about one campground
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground:foundCamp});	
		}
	});
});

module.exports = router;
