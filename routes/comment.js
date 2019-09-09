const router = require("express").Router({
	mergeParams: true
});
const Comment = require("../models/comments");
const Campground = require("../models/campground");
const middleware = require("../middleware/middleware");
const {
	isLoggedIn,
	checkCommentOwner
} = middleware;

// New comment
router.get("/new", isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, camp) => {
		if (err) {
			req.flash("error", err);
			return res.redirect("/campground" + req.params.id);
		} else if (!camp) {
			req.flash("error", "Sorry. Campground couldn't be found.");
			return res.redirect("/campgrounds");
		}
		res.render("comments/new.ejs", {
			camp: camp
		});

	});
});

// Post request to make new comment
router.post("/", isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, camp) => {
		if (err) {
			console.log(err);
			req.flash("error", err);
			return res.redirect("/campgrounds");
		} else if (!camp) {
			req.flash("error", "Sorry. Campground couldn't be found.");
			return res.redirect("/campgrounds");
		}

		Comment.create({
			text: req.body.text
		}, (err, comment) => {
			if (err) console.log(err);
			else {
				comment.author.username = req.user.username;
				comment.author.id = req.user._id;
				comment.save();
				camp.comments.push(comment);
				camp.save();
				res.redirect(`/campgrounds/${req.params.id}`);
			}
		});

	});
});

// Edit Comment Show
router.get("/:comment_id/edit", isLoggedIn, checkCommentOwner, (req, res) => {
	res.render("comments/edit.ejs", {
		comment: req.comment,
		camp: {
			id: req.params.id
		}
	});
});

// Edit Comment Put
router.put("/:comment_id/edit", isLoggedIn, checkCommentOwner, (req, res) => {
	Campground.findById(req.params.id, (err, camp) => {
		if (err) {
			console.log(err);
			req.flash("error", err);
			return res.redirect("/campgrounds");
		} else if (!camp) {
			req.flash("error", "Sorry. Campground couldn't be found.");
			return res.redirect("/campgrounds");
		}
		let editComment = {
			id: req.params.comment_id,
			text: req.body.text
		};
		Comment.findByIdAndUpdate(req.params.comment_id, editComment, (err) => {
			if (err) {
				console.log(err);
				req.flash("error", err);
				return res.redirect("/campgrounds");
			}
			req.flash("success", "Successfully updated.");
			res.redirect("/campgrounds/" + req.params.id);
		});
	});
});

// Delete comment
router.delete("/:comment_id", isLoggedIn, checkCommentOwner, (req, res) => {
	Comment.findByIdAndDelete(req.params.comment_id, (err) => {
		if (err) {
			console.log(err);
			req.flash("error", err);
			return res.redirect("/campgrounds/" + req.params.id);
		}
		Campground.findByIdAndUpdate(req.params.id, {
			$pull: {
				comments: req.params.comment_id
			}
		}, (err) => {
			if (err) {
				console.log(err);
				req.flash("error", err);
				return res.redirect("/campgrounds/" + req.params.id);
			}
			req.flash("success", "Successfully deleted.");
			res.redirect("/campgrounds/" + req.params.id);
		});

	});
});

module.exports = router;