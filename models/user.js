const mongoose = require("mongoose");
const mongooseStrategy = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	email: {
		type: String,
		unique: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	token: {
		hash: String,
		expire: Date
	}
});

userSchema.plugin(mongooseStrategy);

module.exports = mongoose.model("Users", userSchema);