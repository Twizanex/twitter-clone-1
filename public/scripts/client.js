var hollowDiv = $(".hollow");


$("#loginButton").click(function(event) {
    var login = $("[name='login']").val();
    var password = $("[name='password']").val();
    event.preventDefault(event);

    $.ajax({
        url: "/login",
        method: "POST",
        data: {
            "login": login,
            "password": password
        },
    }).then(function(res) {
        hollowDiv.empty();
        if (res == true) {
            console.log("success login");
            hollowDiv.append('<div class="alert alert-success" role="alert">Authorization success. Your data is correct!</div>');
            hollowDiv.css("display", "block");

        } else {
            console.log("wrong cred");
            hollowDiv.append('<div class="alert alert-danger" role="alert">Authorization failed. Plesase check your login and password</div>');
            hollowDiv.css("display", "block");
        }

    })
});