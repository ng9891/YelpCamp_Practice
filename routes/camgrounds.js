const router = require("express").Router();
const Campground = require("../models/campground");
const Comment = require("../models/comments");
const middleware = require("../middleware/middleware");
const {
	isLoggedIn,
	checkCampgroundOwner
} = middleware;

router.get("/", (req, res) => {
	Campground.find({}, (err, camps) => {
		if (err) console.log(err);
		else {
			res.render("campgrounds/index.ejs", {
				camps: camps
			}); // from views
		}
	}).limit(16);
});

router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new.ejs");
});

// Show specific campground
router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, camp) => {
		if (err) {
			req.flash("error", err);
			return res.redirect("/");
		} else if (!camp) {
			req.flash("error", "Sorry. Campground couldn't be found.");
			return res.redirect("/campgrounds");
		}
		return res.render("campgrounds/show.ejs", {
			camp: camp
		});
	});
});

// Show campground edit page
router.get("/:id/edit", isLoggedIn, checkCampgroundOwner, (req, res) => {
	// Campground.findById(req.params.id, (err, camp) => {
	// 	if (err) {
	// 		req.flash("error", err);
	// 		return res.redirect("back");
	// 	} else if (!camp) {
	// 		req.flash("error", "Sorry. Campground couldn't be found.");
	// 		return res.redirect("/campgrounds");
	// 	}
	// 	return res.render("campgrounds/edit.ejs", {
	// 		camp: camp
	// 	});
	// });
	res.render("campgrounds/edit.ejs", {
		camp: req.camp // Gotten from middleware checkCampgroundOWner
	});
});

// Update request campground
router.put("/:id/edit", isLoggedIn, checkCampgroundOwner, (req, res) => {
	let editCamp = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description,
	};
	Campground.findOneAndUpdate(req.params.id, editCamp, (err) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/");
		} else {
			req.flash("success", "Successfully updated.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Create new Campground
router.post("/", isLoggedIn, (req, res) => {
	let newCamp = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	};

	Campground.create(newCamp, (err) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/");
		} else {
			req.flash("success", "Successfully created.");
			res.redirect("/campgrounds");
		}
	});
});

router.delete("/:id", isLoggedIn, checkCampgroundOwner, (req, res) => {
	Comment.deleteMany({
		_id: {
			$in: req.camp.comments
		}
	}, (err) => {
		if (err) {
			console.log(err);
			req.flash("error", err.stack);
			return res.redirect("/campgrounds");
		}
		Campground.findByIdAndDelete(req.params.id, (err) => {
			if (err) {
				req.flash("error", err);
				return res.redirect("/campgrounds");
			}
			req.flash("success", "Campground deleted.");
			res.redirect("/campgrounds");
		});
	});
	// res.send("deleted");
});

module.exports = router;