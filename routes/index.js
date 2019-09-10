const router = require("express").Router({
	mergeParams: true
});
const userModel = require("../models/user");
const passport = require("passport");
const crypto = require("crypto");
const mail = require("../helper/mail");


router.get("/signup", (req, res) => {
	res.render("signup.ejs");
});

router.post("/signup", (req, res) => {
	let newUser = new userModel({
		username: req.body.username,
		email: req.body.email
	});
	if (req.body.admincode === process.env.ADMIN_CODE) {
		newUser.isAdmin = true;
	}
	// Checks for unique email before registering.
	userModel.findOne({
		email: req.body.email
	}, (err, email) => {
		if (err) {
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/signup");
		}
		if (email) {
			req.flash("error", "Email already taken.");
			return res.redirect("/signup");
		}
		// Finally registering after email check.
		// Passport-local-mongoose checks username for you by default.
		userModel.register(newUser, req.body.password, (err, user) => {
			if (err) {
				console.log(err);
				req.flash("error", err.message);
				return res.redirect("/signup");
			}
			// login right away
			passport.authenticate("local")(req, res, () => {
				console.log("Register and login successfully. ", user.username);
				req.flash("success", "Register and login succesfull");
				let redirect = req.session.redirectTo || "/campgrounds";
				delete req.session.redirectTo;
				return res.redirect(redirect);
			});
		});
	});
});

router.get("/login", (req, res) => {
	if (req.user) {
		// req.flash("error", "Already logged in.");
		return res.redirect("/campgrounds");
	}
	res.render("login.ejs");
});

router.post("/login", (req, res) => {
	if (req.user) {
		req.flash("error", "Already logged in.");
		return res.redirect("/campgrounds");
	} else {
		passport.authenticate("local", (err, user) => {
			if (err) {
				req.flash("error", err);
				return res.redirect("/login");
			}
			if (!user) {
				req.flash("error", "Incorrect username or password.");
				return res.redirect("/login");
			}
			req.logIn(user, (err) => {
				if (err) {
					req.flash("error", err);
					return res.redirect("/login");
				}
				let redirect = req.session.redirectTo || "/campgrounds";
				delete req.session.redirectTo;
				req.flash("Welcome to YelpCamp");
				return res.redirect(redirect);
			});

		})(req, res);
	}
});

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logout succesfully");
	res.redirect("/campgrounds");
});

// Show password reset form
router.get("/reset/:token", (req, res) => {
	res.render("reset/new", {
		token: req.params.token
	});
});

router.put("/reset/:token", (req, res) => {
	// Find user that contains the token and it hasn't expired
	userModel.findOne({
		"token.hash": "d5e590c39a42939b47074f4f429c6369bf44f1f6b622c715e677d37d572d4284",
		"token.expire": {
			$gt: Date.now()
		}
	}, (err, user) => {
		if (err) {
			req.flash("error", err.message);
			return res.redirect("/campgrounds");
		}
		if (!user) {
			req.flash("error", "Sorry, your token has expired or you used an invalid token");
			return res.redirect("/campgrounds");
		}
		// Function from passport-mongoose. Encrypts password.
		user.setPassword(req.body.password, (err) => {
			if (err) {
				console.log(err);
				req.flash("error", err.message);
				return res.redirect("/campgrounds");
			}
			user.save();
			req.flash("success", "Password has been reset.");
			return res.redirect("/login");
		});
	});
});
// Show form to submit for password reset
router.get("/reset", (req, res) => {
	if (req.user) {
		req.flash("error", "Please log out first.");
		res.redirect("/reset");
	}
	res.render("reset/index");
});

router.post("/reset", (req, res) => {
	if (req.user) {
		req.flash("error", "Please log out first.");
		res.redirect("/reset");
	}
	// Find an email to check if username and email matches.
	userModel.findOne({
		email: req.body.email
	}, (err, user) => {
		if (err) {
			req.flash("error", err);
			return res.redirect("/reset");
		}
		if (!user || user.username !== req.body.username) {
			req.flash("success", "Instructions will be sent if username and email matches. not");
			return res.redirect("/campgrounds");
		}
		// Create token
		let hash = crypto.createHash("sha256", process.env.CRYPTO_SECRET).update(user.id).digest("hex");
		user.token.hash = hash;
		let date = new Date();
		date = date.setMinutes(date.getMinutes() + 30); // 30 minutes
		user.token.expire = date;
		user.save();
		// Send email.
		mail(user.email, hash);

		req.flash("success", "Instructions will be sent if username and email matches. yes");
		res.redirect("/campgrounds");
	});
});


router.get("/", (req, res) => {
	res.render("index.ejs");
});

module.exports = router;