var express = require("express");
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/login', function(req, res) {
    var body = req.body;
	var valid = false;
    
    for (var i=0; i <users.length; i++) {
        if ((body.login === users[i].login) && (body.password === users[i].password)) {
            valid = true;
            break;
        }
    }

    res.send(valid);
});

app.listen(3000, function() {
    console.log("Server is working on http://localhost:3000/");
});