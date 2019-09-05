var express = require('express'),
    methodoverride = require('method-override'),
    bodyparser = require('body-parser'),
    mongoose = require('mongoose'),
    seedDb = require("./seed.js"),
    Campground = require('./models/campground.js'),
    Comment = require("./models/comments.js");

var app = express();
mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true });
seedDb();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

app.get('/', (req, res)=>{
    res.render("index.ejs");    
});

app.get('/campgrounds', (req, res)=>{
    
    Campground.find({},(err,camps)=>{
        if(err) console.log(err);
        else{
            res.render("campgrounds/index.ejs", {camps : camps}); //from views
        }
    }).limit(16);
});

app.get('/campgrounds/new', (req, res)=>{
    res.render('campgrounds/new.ejs');
});

app.get('/campgrounds/:id', (req, res)=>{

    Campground.findById(req.params.id).populate("comments").exec((err,success)=>{
        if(err) console.log(err);
        else{
            res.render("campgrounds/show.ejs", {camp: success});
        }
    });
});

app.post('/campgrounds', (req, res)=>{
    let newCamp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };

    Campground.create(newCamp, (err, success)=>{
        if(err) console.log(err);
        else{
            res.redirect("campgrounds");
        }
    });
});

app.get("/campgrounds/:id/comments/new", (req, res)=>{

    Campground.findById(req.params.id, (err,success)=>{
        if(err) console.log(err);
        else{
            res.render("comments/new.ejs", {camp : success});
        }
    });
    
});

app.post('/campgrounds/:id/comments', (req, res)=>{
    Campground.findById(req.params.id,(err, successCamp)=>{
        if(err) console.log(err);
        else{
            Comment.create(req.body.comment, (err, successComm)=>{
                if(err) console.log(err);
                else{
                    successCamp.comments.push(successComm);
                    successCamp.save();
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            });
        }
    });
});


app.listen(3000, ()=>{
    console.log("RUNNING. PORT 3000");
    console.log("http://localhost:3000");
});