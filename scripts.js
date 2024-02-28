var animationSpeed = 100;
function setProgress(stepIndex) {
    // Animate the progress bar
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
         // Reset the progress bar for step 1
        setProgress(1); // Then set it for step 2
    });

    $('#getCode').click(function() {
        $('#createUserForm2').fadeOut(animationSpeed, function() {
            $('#otpForm').fadeIn(animationSpeed);
        });

        setProgress(2); // Then set it for step 3
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
            // No need to reset or set progress because we're hiding the progress bar
        }
    });

    // Handling form submissions to prevent page reloads
    $('form').submit(function(e) {
        e.preventDefault();
        // Add form handling logic here (AJAX calls, form validation, etc.)
    });
});
