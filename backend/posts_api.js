const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports = {
	init: function(app) {
		const api_router = express.Router();
		app.use("/posts_api", api_router)
		
		api_router.route("/create").post((req, res, next) => {
			if(!req.isAuthenticated() || !req.body.text ) {
				return res.status(400).send("")
			}
			
			const post = new Post({
				user: req.user.username,
				text: req.body.text,
				created: new Date(),
				modified: new Date()
			})
			
			post.save().then(() => {
				return res.status(200).send("")
			}).catch((err) => {
				console.log("post create error", err)
				return res.status(500).send("")
			})
		})
		
		
		api_router.route("/user").post((req, res, next) => {
			if(!req.body.username) {
				return res.status(400).send("")
			}
			
			Post.find({user: req.body.username}).then(posts => {
				return res.status(200).send(posts)
			}).catch(err => {
				console.log("posts user error", err)
				return res.status(500).send("")
			})
		})
		
		
		api_router.route("/all").get((req, res, next) => {
			Post.find({}).then(posts => {
				return res.status(200).send(posts)
			}).catch(err => {
				console.log("posts all err", err)
				return res.status(500).send("")
			})
		})
		
		
		api_router.route("/delete").post((req, res, next) => {
			if(!req.isAuthenticated() || !req.body._id || !req.user.is_admin) {
				return res.status(400).send("")
			}
			
			
			Post.deleteOne({_id: req.body._id}).then(() => {
				return res.status(200).send("")
			}).catch(err => {
				console.log("post delete error", err)
				return res.status(500).send("")
			})
		})
		
		
		api_router.route("/update").post((req, res, next) => {
			if(!req.isAuthenticated() || !req.body._id || !req.user.is_admin || !req.body.text) {
				return res.status(400).send("")
			}
			
			Post.updateOne({_id: req.body._id}, {text: req.body.text}).then(x => {
				return res.status(200).send()
			}).catch(err => {
				console.log("post update err", err)
				return res.status(500).send("")
			})
		})
		
		
		api_router.route("/get").post((req, res, next) => {
			if(!req.body._id) {
				return res.status(400).send("")
			}
			
			let post = Post.findOne({_id: req.body._id}).then(x => {
				return res.status(200).send(x)
			}).catch(err => {
				console.log("post get error", err)
				return res.status(500).send()
			})
		})
	}
}
