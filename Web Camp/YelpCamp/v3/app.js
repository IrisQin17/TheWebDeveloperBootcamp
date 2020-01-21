var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground  = require("./models/campground"),
	Comment     = require("./models/comment"),
	seedDB      = require("./seeds");
	

// fix deprecate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

app.get("/", function(req, res) {
	res.render("landing");
});

// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds:allCampgrounds});
		}
	});	
});

//CREATE ROUTE - add new campground to database
app.post("/campgrounds", function(req, res) {
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
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

//SHOW ROUTE - show more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground:foundCamp});	
		}
	});

})

app.listen(3000, function() {
	console.log("The YelpCamp Server Has Started!");
});
