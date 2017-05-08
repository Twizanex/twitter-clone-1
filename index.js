var express = require("express");
var app = express();
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var uuidV4 = require("uuid/v4");
var Cookies = require("cookies");

var sessionGenerate = uuidV4();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/tweet", function(err) {
    if (err) {
        console.log("Connection issue: " + err)
    }
});


var userSchema = new mongoose.Schema({
    name    : { type: String, trim: true, required: true },
    email   : { type: String, trim: true, required: true },
    password: { type: String, required: true },
    session : { type: String, default: '' },
    picture : { type: String, default: '' }
});

var tweetSchema = new mongoose.Schema({
    userId  : { type: String, required: true },
    text    : { type: String, required: true },
    date    : { type: Date, default: Date.now },
    picture : { type: String, default: '' }
});


var Tweet = mongoose.model('Tweet', tweetSchema);
var User = mongoose.model('Users', userSchema);

app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/login.html"));
});

app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/profile.html"));
});

app.post("/signup", function(req, res) {
    var body = req.body;
    var user = new User ({
        name: body.name,
        email: body.email,
        password: body.password,
        session: sessionGenerate
    });
    console.log(user);
    user.save(function (err) {
        if (err)
            console.log("User wasn't registered");
    });
    res.cookie("sessionId", sessionGenerate, {
        expires: new Date(Date.now() + 1800000),
        httpOnly: true
    });
    // res.send("user registered successully");
    res.redirect("/profile");
});


app.post('/login', function(req, res) {
    var body = req.body;
	var valid = false;

    User.findOne({ email: body.email, password: body.password }, function(err, user) {
        if (err || user == null) {
            res.send("Wrong user credential");
            return;
        } else {
            valid = true;
            user.update({session: sessionGenerate}, function (err) {
                if (err)
                    console.log(err); 
            });
            console.log(sessionGenerate);
            var cookies = new Cookies(req, res);
            cookies.set( "userId", 1, { maxAge: 365*86400000 } ).set( "sessionId", sessionGenerate, { maxAge: 365*86400000 } );
            res.send(valid);
        }
    });
});
 
app.post("/tweet/add", function(req, res) {
    console.log(req.body);
    var cookies = new Cookies(req, res);
    var userId = cookies.get("userId");
    var sessionId = cookies.get("sessionId");

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
    Tweet.find({}, function(err, tweet){
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