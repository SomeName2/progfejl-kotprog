const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


mongoose.connect('mongodb://mongo:27017/m4uf63ind63', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () { console.log('Connected to MongoDB successfully!'); });


const userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	is_admin: {type: Boolean, required: true},
});


userSchema.pre('save', function(next) {
	const user = this;
	
	if(user.isModified('password')) {
		bcrypt.genSalt(10, function(err, salt) {
			if(err) {
				console.log('hiba a salt generalasa soran');
				return next(error);
			}
			
			bcrypt.hash(user.password, salt, function(error, hash) {
				if(error) {
					console.log('hiba a hasheles soran');
					return next(error);
				}
				user.password = hash;
				return next();
			})
		})
	} else {
		return next();
	}
});


userSchema.methods.comparePasswords = function(password, nx) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		nx(err, isMatch);
	});
};


const post_schema = new mongoose.Schema({
	user: {type: String, required: true},
	text: {type: String, required: true},
	created: {type: Date, required: true},
	modified: {type: Date, required: true},
});


post_schema.pre('updateOne', function(next) {
	this.getUpdate().modified = new Date()
	return next()
});


const User = mongoose.model('user', userSchema);
const Post = mongoose.model('post', post_schema);


function ensureAdminExists() {
	User.findOne({ is_admin: true }).then(function(result) {
		if(!result) {
			const newAdmin = new User({
				username: 'admin',
				password: 'admin123',
				is_admin: true,
			});
			
			newAdmin.save().then(function(){
				console.log('Az admin felhasználó sikeresen létrehozva!')
			}).catch(function(error){
				console.log(error)
			});
			
			for(let i = 0; i < 5; ++i) {
				let user_name = "user_" + i;
				
				new User({
					username: user_name,
					password: user_name,
					is_admin: false,
				}).save();
				
				for(let i2 = 0; i2 < 3; ++i2) {
					let post_text = "This is the text of the " + i2 + " post of " + user_name
					
					new Post({
						user: user_name,
						text: post_text,
						created: new Date(),
						modified: new Date()
					}).save()
				}
			}
		}
	})
}


ensureAdminExists()
