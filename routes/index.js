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
			console.log(err);
			return res.render("/signup");
		}
		// login right away
		passport.authenticate("local")(req, res, () => {
			console.log("Register and login successfully. ", user.username);
			res.redirect("/campgrounds");
		});
	});
});

router.get("/login", (req, res) => {
	if (req.user) {
		return res.redirect("back");
	}
	res.render("login.ejs");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
	successFlash: "Sucessfully Logged In.",
	failureFlash: true
}));

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logout succesfully");
	res.redirect("/campgrounds");
});

router.get("/", (req, res) => {
	res.render("index.ejs");
});

module.exports = router;