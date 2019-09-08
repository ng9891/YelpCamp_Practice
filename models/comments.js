const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users"
		},
		username: String
	}
});

module.exports = mongoose.model("Comments", commentSchema);