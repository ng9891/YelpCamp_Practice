const router = require("express").Router({
	mergeParams: true
});
const userModel = require("../models/user");
const passport = require("passport");

router.get("/signup", (req, res) => {
	res.render("signup.ejs");
});

router.post("/signup", (req, res) => {
	let newUser = new userModel({
		username: req.body.username,
		signup: req.body.email
	});

	userModel.register(newUser, req.body.password, (err, user) => {
		if (err) {
			req.flash("error", err);
			return res.render("signup");
		}
		// login right away
		passport.authenticate("local")(req, res, () => {
			console.log("Register and login successfully. ", user.username);
			req.flash("success", "Register and login succefull");
			let redirect = req.session.redirectTo || "/campgrounds";
			delete req.session.redirectTo;
			return res.redirect(redirect);
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

router.get("/", (req, res) => {
	res.render("index.ejs");
});

module.exports = router;