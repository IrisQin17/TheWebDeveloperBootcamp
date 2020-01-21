var mongoose = require("mongoose");

// fix deprecate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");


Post.create({
	title: "How to make cake",
	content: "Sugar + flavour + coco powder"
}, function(err, post){
	User.findOne({email:"tomes@browne.com"}, function(err, foundUser){
		if(err)
			console.log(err);
		else {
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err)
					console.log(err);
				else
					console.log(data);
			});
		}
			
	});
});


// User.findOne({email:"tomes@browne.com"}).populate("posts").exec(function(err, user){
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(user);
// });
