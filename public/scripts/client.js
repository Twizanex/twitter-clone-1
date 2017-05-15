var tweetButton = $("#tweetButton");
var tweetInput = $("#tweetInput");

$(document).ready(function() {
    // var user = localStorage.getItem("user");

    $.ajax({
        url: "/tweet",
        method: "GET"
    }).then(function(tweet) {
        tweet.forEach(function(tweet) {
            
        })
    })
});

tweetButton.click(function() {
    event.preventDefault()
    var newTweet = {
        text: tweetInput.val()
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