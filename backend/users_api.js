const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = {
	init: function(app) {
		const api_router = express.Router();
		app.use("/users_api", api_router)
		
		
		api_router.route('/login').post((req, res, next) => {
			if (!req.body.username || !req.body.password) {
				console.log("login username or password missing")
				res.status(400).send(false)
			}
			
			passport.authenticate('local', function (error, user) {
				if (error) {
					console.log("passport error: ", error)
					return res.status(200).send(false)
				}
					
				req.login(user, function (error) {
					if (error) {
						console.log("login error: ", error)
						return res.status(500).send(false)
					}
					
					res.status(200).send({user: req.user.username, is_admin: req.user.is_admin})
				})
			})(req, res);
		})
		
		
		api_router.route('/register').post((req, res, next) => {
			if(!req.body.username || !req.body.password) {
				console.log("register missing username or password")
				return res.status(400).send(false)
			}
			
			User.findOne({ username: req.body.username }).then(function(result) {
				if(result) {
					return res.status(200).send(false)
				} else {
					const user = new User({
						username: req.body.username,
						password: req.body.password,
						is_admin: false,
					});
					
					const newUser = user.save().then(function(){
						res.status(200).send(true)
					}).catch(function(error){
						console.log("register error ", error)
						res.status(500).send(false)
					})
				}
			}).catch(function(error) {
				console.log("register error ", error)
				res.status(500).send(false)
			})
		})
		
		
		api_router.route('/status').get((req, res, next) => {
			if (req.isAuthenticated()) {
				return res.status(200).send({user: req.user.username, is_admin: req.user.is_admin});
			} else {
				return res.status(200).send({user: "", is_admin: false});
			}
		})
		
		
		api_router.route("/all").get((req, res, next) => {
			let users = []
			User.find({}).then(function(result) {
				for(let user of result) {
					users.push(user.username)
				}
				
				return res.status(200).send(users);
			}).catch(err => {
				console.log("users all error", err)
				return res.status(500).send("")
			})
		})
		
		
		api_router.route("/logout").get((req, res, next) => {
			if(req.isAuthenticated()) {
				req.logout(() => {})
				return res.status(200).send("")
			} else {
				return res.status(400).send("")
			}
		})
	}
}



