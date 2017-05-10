var hollowDiv = $(".hollow");

$("#loginButton").click(function(event) {
    event.preventDefault(event);
    var email = $("[name='email']").val();
    var password = $("[name='password']").val();

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
        localStorage.setItem("user", JSON.stringify(res));
        window.location.replace("/");  
    }, function(error) {
        var message = error.responseJSON && error.responseJSON.message || 'An error occured';
        hollowDiv.html('<div class="alert alert-danger" role="alert">' + message + '</div>');
        hollowDiv.css("display", "block");  
    });
});