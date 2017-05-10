var hollowDiv = $(".hollow");

$("#signUpButton").click(function(event) {
    event.preventDefault(event);
    var name = $("[name='name']").val();
    var email = $("[name='email-signup']").val();
    var password = $("[name='password-signup']").val();

    $.ajax({
        url: "/signup",
        method: "POST",
        data: {
            "name": name,
            "email": email,
            "password": password
        },
    }).then(function(res) {
            hollowDiv.empty();
            if (res == true) {
                window.location.replace("/profile");
            } else {
                hollowDiv.append('<div class="alert alert-danger" role="alert">Authorization failed. Plesase check your login and password</div>');
                hollowDiv.css("display", "block");
            }; 
        })
});