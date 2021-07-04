const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const l = require('lodash');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
	res.render("home", {
		headContent: "", 
		postList: posts
	});
	console.log(req.body.name);
});

app.get("/about", function (req, res) {
	res.render("about"); 
});

app.get("/contact", function (req, res) {
	res.render("contact"); 
}); 

app.get("/compose", function (req, res) {
	res.render("compose"); 
});

app.post("/compose", function (req, res) {
	
	const post = {
		name : req.body.bloggerName,
		title : req.body.composeTitle,
		content : req.body.composeBody,
		picture : req.body.blogImage
	};

	posts.push(post);
	console.log(post);
	console.log(document.getElementById("name"));
	res.redirect("/");
});

// creating dynamic routes using route parameter of express
app.get("/post/:postTopic", function (req, res) {

	const requestedPostTitle = req.params.postTopic;

	posts.forEach(function(element) {
		if (l.lowerCase(requestedPostTitle) === l.lowerCase(element.title)) {
		 	res.render("post", {
		 		blogTitle: element.title, 
		 		blogContent: element.content
		 	});
		} else {
		 	res.redirect("/");
		} 
	});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
