const mongoose = require("mongoose");
const mongooseStrategy = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
});

userSchema.plugin(mongooseStrategy);

module.exports = mongoose.model("Users", userSchema);