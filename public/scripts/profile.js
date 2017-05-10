$(document).ready(function() {
	var fullName = $("[name='fullName']");
	var nickName = $("[name='nickName']");
	var email = $("[name='email']");
	var password = $("[name='password']");

	$.ajax({
        url: "/profile",
        method: "GET"
    }).then(function(res) {
        if (res == true) {
        	fullName.val("");
        	nickName.val("");
        	email.val("");
        	password.val("");
        } else {
        	
        };
    });
});