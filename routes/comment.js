const router = require("express").Router({
	mergeParams: true
});
const Comment = require("../models/comments");
const Campground = require("../models/campground");

// New comment
router.get("/new", (req, res) => {
	Campground.findById(req.params.id, (err, camp) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new.ejs", {
				camp: camp
			});
		}
	});
});

// Post request to make new comment
router.post("/", (req, res) => {
	Campground.findById(req.params.id, (err, successCamp) => {
		if (err) console.log(err);
		else {
			Comment.create({
				text: req.body.text
			}, (err, successComm) => {
				if (err) console.log(err);
				else {
					successComm.author.username = req.user.username;
					successComm.author.id = req.user._id;
					successComm.save();
					successCamp.comments.push(successComm);
					successCamp.save();
					res.redirect(`/campgrounds/${req.params.id}`);
				}
			});
		}
	});
});

module.exports = router;