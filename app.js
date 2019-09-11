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
const helmet = require("helmet");
const csurf = require("csurf");

const app = express();

require("dotenv").config(); // Requiring environmental files

mongoose.connect(process.env.MONGO_DB, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true
});
// const seedDb = require("./seed.js");
// seedDb();
app.use(helmet());

app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(methodoverride("_method"));

// Passport config
app.use(require("express-session")({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));

app.use(csurf());

app.locals.moment = require("moment"); // To be used in ejs files.


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
	res.locals.csrfToken = req.csrfToken();
	next();
});


app.use((err, req, res, next) => {
	// Invalid CSRF token error handling
	if (err.code === "EBADCSRFTOKEN") {
		return res.status(403).send("CSRF not valid. Please make the request on our website.");
	}
	// Add other error handlings here.
	next();
});

app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use("/", indexRoute);

app.listen(3000, () => {
	console.log("RUNNING. PORT 3000");
	console.log("http://localhost:3000");
});