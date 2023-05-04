const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = {
	login: function(req, res, cb) {
		if (req.body.username, req.body.password) {
			passport.authenticate('local', function (error, user) {
				if (error)
					return cb(error, false);
					
				req.login(user, function (error) {
					if (error)
						return cb(error, false)
					
					return cb(null, true);
				})
			})(req, res);
		} else {
			return cb('Hibas keres, username es password kell', false);
		}
	},
	register: function(req, cb) {
		const user = new User({
				username: req.body.username,
				password: req.body.password,
				accessLevel: 1,
		});
		
		const newUser = user.save().then(function(){cb(null, true)}).catch(function(error){cb(error, false)})
	}
}
