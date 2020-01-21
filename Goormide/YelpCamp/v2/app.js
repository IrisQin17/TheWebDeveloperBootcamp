var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose");

// var campgrounds = [
// 		{name: "Salmon Creek", image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
// 		{name: "Granite Hill", image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80"},
// 		{name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"},
// 	{name: "Salmon Creek", image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},
// 		{name: "Granite Hill", image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1559&q=80"},
// 		{name: "Mountain Goat's Rest", image:"https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"}
// 	];

// fix deprecate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Salmon Creek", 
// 	image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
// 	description: "No bathroom, beautiful view."
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATE CAMGROUND: ");
// 		console.log(campground);
// 	}
// });


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
	Campground.findById(req.params.id, function(err, foundCamp){
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
