var express = require("express");
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var date = new Date();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost/tweet", function(err) {
    if (err) {
        console.log("Connection issue: " + err)
    }
});


var userSchema = new mongoose.Schema({
    name    : { type: String, trim: true, required: true },
    email   : { type: String, trim: true, required: true },
    password: { type: String, required: true },
    picture : { type: String, default: '' }
});

var tweetSchema = new mongoose.Schema({
    userId  : { type: String, required: true },
    text    : { type: String, required: true },
    date    : { type: Date, default: Date.now },
    picture : { type: String, default: '' }
})

var Tweet = mongoose.model('Tweet', tweetSchema);
var User = mongoose.model('Users', userSchema);


app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/login.html"));
});

app.post("/signup", function(req, res) {
    var body = req.body;
    var user = new User ({
        name: body.name,
        email: body.email,
        password: body.password
    });
    console.log(user);
    user.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('meow');
      }
    });
    res.send("user registered successully");
});

app.post('/login', function(req, res) {
    var body = req.body;
	var valid = false;

    User.findOne({ email: body.email, password: body.password }, function(err, user) {
        if (err || user == null) {
            res.send(err);
            return;
        } else {
            valid = true;
            res.send(valid);
        }
    });
});

app.post("/tweet/add", function(req, res) {
    console.log(req.body);
    var newTweet = new Tweet(req.body);

    newTweet.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(true);
        }
    });
});

app.get("/tweet", function(req, res) {
    Tweet.findOne({}, function(err, tweet){
        if (err) {
            res.send(err);
        } else {
            res.send(tweet);
        }
    }) 
});


app.listen(3000, function() {
    console.log("Server is working on http://localhost:3000/");
});