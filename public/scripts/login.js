var hollowDiv = $(".hollow");


$("#loginButton").click(function(event) {
    var email = $("[name='email']").val();
    var password = $("[name='password']").val();
    event.preventDefault(event);

    $.ajax({
        url: "/login",
        method: "POST",
        data: {
            "email": email,
            "password": password
        },
    }).then(function(res) {
        hollowDiv.empty();
        if (res == true) {
            window.location.href = '/';
        } else {
            hollowDiv.append('<div class="alert alert-danger" role="alert">Authorization failed. Plesase check your login and password</div>');
            hollowDiv.css("display", "block");
        };

    });
});

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
                window.location.href = '/';
                hollowDiv.append('<div class="alert alert-success" role="alert">Authorization success. Your data is correct!</div>');
                hollowDiv.css("display", "block");

            } else {
                hollowDiv.append('<div class="alert alert-danger" role="alert">Authorization failed. Plesase check your login and password</div>');
                hollowDiv.css("display", "block");
            }; 
        })
});