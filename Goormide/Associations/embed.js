var mongoose = require("mongoose");

// fix deprecate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/blog_demo");

// POST
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = new mongoose.model("Post", postSchema);

// USER
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


var newUser = new User({
	email: "amy@blake.edu",
	name: "Amy Blake"
});

newUser.posts.push({
	title: "Agree",
	content: "Totally agree with you!"
});

newUser.save(function(err, user){
	if(!err)
		console.log(user);
});

// var newPost = new Post({
// 	title: "Relections on Apples",
// 	content: "They are yummy"
// });
// newPost.save(function(err, post){
// 	if(!err)
// 		console.log(post);
// });
