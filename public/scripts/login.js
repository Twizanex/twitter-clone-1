var hollowDiv = $(".hollow");


$("#loginButton").click(function(event) {
    var email = $("[name='email']").val();
    var password = $("[name='password']").val();
    event.preventDefault(event);

    $.ajax({
        url: "/login",
        method: "POST",
        dataType: 'json',
        data: {
            "email": email,
            "password": password
        },
    }).then(function(res) {
        console.log(res);
        localStorage.setItem(res, JSON.stringify(res));
        window.location.replace("/");  
    }, function(error) {
        var message = error.responseJSON && error.responseJSON.message || 'An error occured';
        hollowDiv.html('<div class="alert alert-danger" role="alert">' + message + '</div>');
        hollowDiv.css("display", "block");  
    });
});


