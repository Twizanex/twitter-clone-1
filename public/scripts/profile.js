var fullName = $("[name='fullName']");
var nickName = $("[name='nickName']");
var email = $("[name='email']");
var password = $("[name='password']");

$(document).ready(function() {
    var user = localStorage.getItem("user").split(",").splice(1,3);
    fullName.val(user[0].split(":").splice(1));
    // nickName.val(user[0].split(":").splice(1));
    email.val(user[1].split(":").splice(1));
    password.val(user[2].split(":").splice(1));
});

$("#saveButton").click(function() {
    // event.preventDefault(event);

    $.ajax({
        url: "/profile/save",
        method: "POST",
        dataType: "json",
        data: {
            "name": fullName.val(),
            "nickname": nickName.val(),
            "email": email.val(),
            "password": password.val()
        },
    }).then(function(res) {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res));
        window.location.replace("/");  
    })
});