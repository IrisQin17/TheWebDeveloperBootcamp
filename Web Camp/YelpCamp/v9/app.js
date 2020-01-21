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

// requiring routes
var	commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");
	
// fix deprecate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp_v9");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


// seedDB(); // seed the database

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

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id", commentRoutes);

app.listen(3000, function() {
	console.log("The YelpCamp Server Has Started!");
});
