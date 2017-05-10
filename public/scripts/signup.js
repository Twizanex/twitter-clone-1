var hollowDiv = $(".hollow");

$("#signUpButton").click(function(event) {
    event.preventDefault(event);
    var name = $("[name='name-signup']").val();
    var email = $("[name='email-signup']").val();
    var password = $("[name='password-signup']").val();

    $.ajax({
        url: "/signup",
        method: "POST",
        dataType: 'json',
        data: {
            "name": name,
            "email": email,
            "password": password
        }, 
    }).then(function(res) {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res));
        window.location.replace("/profile");  
    }, function(error) {
        var message = error.responseJSON && error.responseJSON.message || 'An error occured';
        hollowDiv.html('<div class="alert alert-danger" role="alert">' + message + '</div>');
        hollowDiv.css("display", "block");  
    });
});