const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const l = require('lodash');
const path = require('path');
const fs = require('fs');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));
app.set('view engine', 'ejs');

const blogList = require(__dirname + '/model/bloggerDetails.model.js');
const upload = require(__dirname + '/middleware/multer.js');
const date = require('./date');
const db = require('./database');

db();

app.get("/", (req, res) => {
	blogList.estimatedDocumentCount((err, count) => {
		if(err) {
			console.log(err);
		} else if(count === 0){
			res.status(500).send("There is no blog created till now.");
		} else {
			blogList.find((err, posts) => {
				if(err) {
					console.log(err);
				} else {
					res.render("home", { postList: posts });
				}
			});
		}
	});
});

app.get("/about", (req, res) => {
	res.render("about"); 
});

app.get("/contact", (req, res) => {
	res.render("contact"); 
}); 

app.get("/compose", (req, res) => {
	res.render("compose"); 
});

app.post("/compose", upload.single('blogImage') ,(req, res, next) => {
	if(req.file === undefined){
		console.log("no file uploaded");
		return res.send("select an image to upload...");
	} else {
		if(req.body === undefined){
			console.log("one or more input fields are empty.");
			return res.send("please populate the input fields with the data...");
		} else {
			const post = new blogList();
			post.bloggerName = req.body.bloggerName,
			post.composeTitle = req.body.composeTitle,
			post.composeBody = req.body.composeBody;
			post.blogImage.data = fs.readFileSync(req.file.path);
			if(req.file.mimetype === "image/png"){
				post.blogImage.contentType = 'image/png';
			} else if(req.file.mimetype === "image/jpeg"){
				post.blogImage.contentType = 'image/jpeg';
			}
			
			post.save((err)=>{
				if(!err){
					console.log("new post record inserted.")
					res.redirect("/");
				}
			});
		}
	}
});

// creating dynamic routes using route parameter of express
app.get("/post/:postTopic", (req, res) => {
	const requestedPostTitle = req.params.postTopic;

	blogList.findOne({composeTitle: requestedPostTitle}, (err, post) => {
		if(err) {
			console.log(err);
		} else {
			res.render("post", { postPage: requestedPostTitle, postContent: post });
		}
	});
});

app.put("/post/:postTopic", (req, res) => {
	const requestedPostTitle = req.params.postTopic;
	
	const updatedBlog = blogList.findByIdAndUpdate(requestedPostTitle, (err, post)=>{
		if(err){
			res.status(400).send("Server error");
		} else {
			$inc: {likeCount: 1}
		}
	},{new: true});
	res.send(updatedBlog);
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
