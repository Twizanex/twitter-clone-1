$(document).ready(function() {
	var fullName = $("[name='fullName']");
	var nickName = $("[name='nickName']");
	var email = $("[name='email']");
	var password = $("[name='password']");

    var user = localStorage.getItem("user").split(",").splice(1,3);
    fullName.val(user[0].split(":").splice(1));
    email.val(user[1].split(":").splice(1));
    password.val(user[2].split(":").splice(1));

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