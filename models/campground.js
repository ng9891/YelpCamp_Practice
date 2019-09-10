const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	price: Number,
	createdAt: {
		type: Date,
		default: Date.now
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comments"
	}],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users"
		},
		username: String
	}
});

module.exports = mongoose.model("Campground", campgroundSchema);