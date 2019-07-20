const User = require('../db/models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		User.findOne({ 'local.username': username }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			// console.log(userMatch.local.username);
			if (!userMatch) {
				console.log("none match");
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!userMatch.checkPassword(password)) {
				console.log("no password");
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy
