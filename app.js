const express = require("express");
const methodoverride = require("method-override");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const campgroundRoute = require("./routes/camgrounds");
const commentRoute = require("./routes/comment");
const indexRoute = require("./routes/index");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("./models/user");
const flash = require("connect-flash");

const app = express();
mongoose.connect("mongodb://localhost:27017/yelpcamp", {
	useNewUrlParser: true,
	useFindAndModify: false
});
// const seedDb = require("./seed.js");
// seedDb();
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(methodoverride("_method"));

// Passport config
app.use(require("express-session")({
	secret: "This is not a secret at all. Don't look",
	resave: false,
	saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use((req, res, next) => {
	res.locals.localUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.errors = req.flash("error");
	next();
});

app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use("/", indexRoute);

app.listen(3000, () => {
	console.log("RUNNING. PORT 3000");
	console.log("http://localhost:3000");
});