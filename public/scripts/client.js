// window.onload = function () {

// };

var tweetButton = $("#tweetButton");
var tweetInput = $("#tweetInput");


tweetButton.click(function() {
    event.preventDefault()

    var date = new Date();
    // id = id.toString();
    // id = btoa(id);

    var newTweet = {
        text: tweetInput.val(),
        date: date
    };

    $.ajax({
        url: "/tweet/add",
        method: "POST",
        data: newTweet
    }).then(function(res) {
        console.log(res)

        if (res == true) {
            tweetInput.val("");
        } else {
            alert("Error when saving tweet: " + res)
        };
    });
});

function checkInput() {
    var constraints = "^[a-zA-Z0-9\s]{1,140}$";
};