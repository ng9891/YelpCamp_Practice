const Campground = require("../models/campground");
const Comment = require("../models/comments");

module.exports = {
	isLoggedIn: (req, res, next) => {
		if (!req.isAuthenticated()) {
			req.flash("error", "Please log in");
			req.session.redirectTo = req.originalUrl; //Sets redirect for better User flow
			return res.redirect("/login");
		}
		next();
	},
	checkCampgroundOwner(req, res, next) {
		Campground.findById(req.params.id, (err, camp) => {
			if (err) {
				req.flash("error", err);
				return res.redirect("/campgrounds");
			}
			// Check for valid camp id
			if (!camp) {
				req.flash("error", "Sorry. Campground couldn't be found.");
				return res.redirect("/campgrounds");
			}
			// If you are not the owner and not an admin, redirect.
			if (!camp.author.id.equals(req.user._id) && !req.user.isAdmin) {
				req.flash("error", "Sorry, you are not the owner of this post.");
				return res.redirect("/campgrounds/" + req.params.id);
			}
			req.camp = camp;
			next();
		});
	},
	checkCommentOwner(req, res, next) {
		Comment.findById(req.params.comment_id, (err, comment) => {
			if (err) {
				req.flash("error", err);
				return res.redirect("/campgrounds");
			}
			// Check for valid comment id
			if (!comment) {
				req.flash("error", "Sorry. Comment couldn't be found.");
				return res.redirect("/campgrounds");
			}
			// If you are not the owner and not an admin, redirect.
			if (!comment.author.id.equals(req.user._id) && !req.user.isAdmin) {
				req.flash("error", "Sorry, you are not the owner of this comment.");
				return res.redirect("/campgrounds/" + req.params.id);
			}
			req.comment = comment;
			next();
		});
	}
};