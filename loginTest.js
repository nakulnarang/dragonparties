var animationSpeed = 800; // Animation speed for the transition

function setProgress(stepIndex) {
    $("#progressbar li").removeClass("active");
    $("#progressbar li").eq(stepIndex).addClass("active");
}

$(document).ready(function() {
    function showForm(current, next) {
        // Scale down and fade out the current form
        current.animate({ opacity: 0, scale: '0.8' }, {
            step: function(now, fx) {
                if (fx.prop === "scale") {
                    $(this).css('transform', 'scale(' + now + ')');
                }
            },
            duration: animationSpeed,
            complete: function() {
                $(this).hide().css('opacity', '1').css('transform', 'scale(1)'); // Reset styles
            }
        });

        // Slide in the next form from the right
        next.css({ 'left': '50%', 'opacity': '0' }).show().animate({ left: '0', opacity: '1' }, animationSpeed);
    }

    $('#showCreateUserForm1').click(function(e) {
        e.preventDefault();
        $('#loginForm').hide();
        $('#createUserForm1').show();
        $('#backButton').show();
        $('#progressbar').show();
        setProgress(0);
    });

    $('#nextToForm2').click(function() {
        var currentForm = $('#createUserForm1');
        var nextForm = $('#createUserForm2');
        showForm(currentForm, nextForm);
        setProgress(1);
    });

    $('#getCode').click(function() {
        var currentForm = $('#createUserForm2');
        var nextForm = $('#otpForm');
        showForm(currentForm, nextForm);
        setProgress(2);
    });

    $('#backButton').click(function() {
        var currentForm = $(this).closest('form');
        var previousForm = currentForm.prev('form');
        
        // Slide out the current form to the right and fade out
        currentForm.animate({ left: '50%', opacity: '0' }, {
            duration: animationSpeed,
            complete: function() {
                $(this).hide().css({ 'left': '0', 'opacity': '1' }); // Reset styles
            }
        });

        // Scale up the previous form (if exists) and fade in
        if (previousForm.length) {
            previousForm.css({ 'transform': 'scale(0.8)', 'opacity': '0' }).show().animate({ opacity: '1', scale: '1' }, {
                step: function(now, fx) {
                    if (fx.prop === "scale") {
                        $(this).css('transform', 'scale(' + now + ')');
                    }
                },
                duration: animationSpeed
            });

            var formIndex = $("form").index(previousForm);
            setProgress(formIndex - 1); // Set progress based on the previous form index
            if (formIndex === 0) {
                $('#backButton').hide(); // Hide back button when at first form
                $('#progressbar').hide(); // Hide progress bar when at first form
            }
        }
    });

    // Handling form submissions to prevent page reloads
    $('form').submit(function(e) {
        e.preventDefault();
        // Add form handling logic here (AJAX calls, form validation, etc.)
    });
});
