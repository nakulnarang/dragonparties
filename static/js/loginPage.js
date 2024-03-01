var animationSpeed = 100;
function setProgress(stepIndex) {

    $("#progressbar li").eq(stepIndex).addClass("active").hide().fadeIn(600);
}

function resetProgress(stepIndex) {
    $("#progressbar li").eq(stepIndex).removeClass("active");
}

$(document).ready(function() {
    $('#showCreateUserForm1').click(function(e) {
        e.preventDefault();
        $('#loginForm').fadeOut(animationSpeed, function() {
            $('#createUserForm1').fadeIn(animationSpeed);
            $('#backButton').fadeIn(animationSpeed);
            $('#progressbar').fadeIn(animationSpeed);
        });
        setProgress(0);
    });

    $('#nextToForm2').click(function() {
        $('#createUserForm1').fadeOut(animationSpeed, function() {
            $('#createUserForm2').fadeIn(animationSpeed);
        });
        
        setProgress(1);
    });

    $('#getCode').click(function() {
        $('#createUserForm2').fadeOut(animationSpeed, function() {
            $('#otpForm').fadeIn(animationSpeed);
        });

        setProgress(2); 
    });

    $('#backButton').click(function() {
        if ($('#otpForm').is(':visible')) {
            $('#otpForm').fadeOut(animationSpeed, function() {
                $('#createUserForm2').fadeIn(animationSpeed);
            });
            resetProgress(2);
            setProgress(1);
        } else if ($('#createUserForm2').is(':visible')) {
            $('#createUserForm2').fadeOut(animationSpeed, function() {
                $('#createUserForm1').fadeIn(animationSpeed);
            });
            resetProgress(1);
            setProgress(0);
        } else if ($('#createUserForm1').is(':visible')) {
            $('#createUserForm1').fadeOut(animationSpeed, function() {
                $('#backButton').fadeOut(animationSpeed);
                $('#progressbar').fadeOut(animationSpeed);
                $('#loginForm').fadeIn(animationSpeed);
            });
            
        }
    });

    
    $('form').submit(function(e) {
        e.preventDefault();
    });
});
