var express = require("express");
var app = express();
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var uuidV4 = require("uuid/v4");
var Cookies = require("cookies");

var sessionGenerate = uuidV4;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/tweet", function(err) {
    if (err) {
        console.log("Connection issue: " + err)
    }
});

function authMiddleware (req, res, next) {
    var cookies = new Cookies(req, res);
    var userId = cookies.get("userId");
    var sessionId = cookies.get("sessionId");
    User.findOne({ _id: userId, session: sessionId }, function(err, user) {
        if (err || !user) {
            return res.redirect('/login');
        } 
        next();
    });
}

function apiAuthMiddleware (req, res, next) {
    var cookies = new Cookies(req, res);
    var userId = cookies.get("userId");
    var sessionId = cookies.get("sessionId");
    User.findOne({ _id: userId, session: sessionId }, function(err, user) {
        if (err) {
            return res.status(500).json({ message: err.message, error: true });
        } else if (!user) {
            return res.status(401).json({ message: 'Unauthorized', error: true });
        }
        req._user = user;
        next();
    });
}

var userSchema = new mongoose.Schema({
    name    : { type: String, trim: true, required: true },
    nickname: { type: String, trim: true },
    email   : { type: String, trim: true, required: true },
    password: { type: String, required: true },
    session : { type: String, default: '' },
    picture : { type: String, default: '' }
});

var tweetSchema = new mongoose.Schema({
    userId  : { type: String, required: true },
    text    : { type: String, required: true },
    date    : { type: Date, default: Date.now, index: true },
    picture : { type: String, default: '' }
});


var Tweet = mongoose.model('Tweet', tweetSchema);
var User = mongoose.model('Users', userSchema);

app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/login.html"));
});

app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/signup.html"));
});

app.get("/profile", authMiddleware, function(req, res) {
    res.sendFile(path.join(__dirname, "./public/profile.html"));
});

app.post("/signup", function(req, res) {
    var body = req.body;
    var user = new User ({
        name: body.name,
        email: body.email,
        password: body.password,
        session: sessionGenerate()
    });
    console.log(user);
    user.save(function (err) {
        if (err)
            console.log("User wasn't registered");
    });
    res.cookie("sessionId", user.session, {
        expires: new Date(Date.now() + 1800000),
        httpOnly: true
    });
    res.send(true);
});

app.post('/login', function(req, res) { 
    User.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {
        if (err) {
            return res.status(500).json({ message: err.message, error: true });
        } else if (!user) {
            return res.status(401).json({ message: 'Unauthorized', error: true });
        }
        user.session = sessionGenerate();
        console.log(user);
        user.save(function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message, error: true });    
            }
            console.log(sessionGenerate);
            var cookies = new Cookies(req, res);
            cookies.set( "userId", user._id, { maxAge: 365*86400000 } ).set( "sessionId", user.session, { maxAge: 365*86400000 } );
            res.json(user.toJSON());
        });
    });
});

app.post('/profile', apiAuthMiddleware, function(req, res) {
    var updatedUser = Object.assign(req._user, req.body);
    updatedUser.save(function(err, user) {
        if (err || _id == null) {
            res.send(userLogged);
            return;
        } else {
            userLogged = true;
            res.send(userLogged);
        }
    });
});
 
app.post("/tweet/add", apiAuthMiddleware, function(req, res) {
    req.body.userId = req._user._id;
    var newTweet = new Tweet(req.body);


    newTweet.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(true);
        }
    });
});

app.get("/tweet", apiAuthMiddleware, function(req, res) {
    Tweet.find({userid: req._user._id})
        .sort({ date: -1 })
        // .limit(10)
        // .skip(10)
        .exec(function(err, tweet){
            if (err) {
                res.send(err);
            } else {
                res.send(tweet);
                console.log(tweet);
            }
        }) 
});


app.listen(3000, function() {
    console.log("Server is working on http://localhost:3000/");
});