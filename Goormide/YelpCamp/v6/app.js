var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	passport    = require("passport"),
	Campground  = require("./models/campground"),
	Comment     = require("./models/comment"),
	LocalStrategy 	= require("passport-local"),
	User 		= require("./models/user"),
	seedDB      = require("./seeds");
	
// fix deprecate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
	secret : "Into to the unknown",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currUser = req.user;
	next();
});                  // call it on every route

// ==========
// Routes
// ==========

app.get("/", function(req, res) {
	res.render("landing");
});

// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
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
	res.render("campgrounds/new");
});

// SHOW ROUTE - show more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground:foundCamp});	
		}
	});
});

// ========================
// COMMENTS ROUTES
// ========================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err)
			console.log(err);
		else
			res.render("comments/new", {campground:campground});
	});
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console/log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err)
					console.log(err);
				else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// ========================
// AUTH ROUTES
// ========================

// show register form
app.get("/register", function(req, res){
	res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

// show login form
app.get("/login", function(req, res){
	res.render("login");
});

// handling login logic (middleware)
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
	   return next();
	res.redirect("/login");
}


app.listen(3000, function() {
	console.log("The YelpCamp Server Has Started!");
});
