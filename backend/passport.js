const mongoose = require('mongoose');
const User = mongoose.model('user');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');


module.exports = {
	init: function(app) {
		const bodyParser = require('body-parser');
		const cookieParser = require('cookie-parser');
		
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(cookieParser());
		app.use(expressSession({ secret: 'prf2021lassananodejsvegereerunk', resave: true, saveUninitialized: true }));
		app.use(passport.initialize());
		app.use(passport.session());
	}
}


passport.use('local', new localStrategy(function (username, password, done) {
	User.findOne({ username: username }).then(function (user) {
		if (!user)
			return done('Nincs ilyen felhasználónév', false);
			
		user.comparePasswords(password, function (error, isMatch) {
			if (error)
				return done(error, false);
				
			if (!isMatch)
				return done('Hibas jelszo', false);
				
		return done(null, user);
      })
  }).catch(function(err){
		return done('Hiba lekeres soran', false);
	})
}));


passport.serializeUser(function (user, done) {
	if (!user) return done('nincs megadva beléptethető felhasználó', null);
	return done(null, user);
});

passport.deserializeUser(function (user, done) {
	if (!user) return done("nincs user akit kiléptethetnénk", null);
	return done(null, user);
});
