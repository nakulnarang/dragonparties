var animationSpeed = 100;
function setProgress(stepIndex) {

    $("#progressbar li").eq(stepIndex).addClass("active").hide().fadeIn(600);
    if(stepIndex == 0){
        $('#backButton').hide();
      
    }
    else{
        $('#backButton').show();
    }
}

function resetProgress(stepIndex) {
    $("#progressbar li").eq(stepIndex).removeClass("active");
}




// $(document).on('input', '#otpForm :input', function() {
//     updateButtonState('otpForm', 'verifyOtp', 'otpFormError');
// });
$(document).ready(function() {
    setProgress(0);

    function updateButtonState(formId, buttonId, errorDivId) {
        let isFormFilled = true;
        let firstEmptyInput = null;

        $(`#${formId} :input`).each(function() {
            console.log(`Checking input: ${$(this).attr('id')} with value: ${$(this).val()}`); // Debugging line
            if ($(this).val() === '' && $(this).attr('type') !== 'button') {
                isFormFilled = false;
                if (!firstEmptyInput) {
                    firstEmptyInput = $(this).attr('placeholder') || $(this).attr('name');
                }
            }
        });
        console.log(`isFormFilled: ${isFormFilled}, firstEmptyInput: ${firstEmptyInput}`); // Debugging line
        if (isFormFilled) {
            $(`#${buttonId}`).prop('disabled', false);
            $(`#${errorDivId}`).text(''); // Clear any previous error messages
        } else {
            $(`#${buttonId}`).prop('disabled', true);
            if (firstEmptyInput) {
                $(`#${errorDivId}`).text(`Please fill out the ${firstEmptyInput} field.`);
            }
        }
    }
    $('#nextToForm2, #getCode').prop('disabled', true);
    // Use this updated function for the event listeners
    $('#createUserForm1 :input').on('input', function() {
        updateButtonState('createUserForm1', 'nextToForm2', 'createUserForm1Error');
    });
    $('#createUserForm2 :input').on('input', function() {
        updateButtonState('createUserForm2', 'getCode', 'createUserForm2Error');
    });
    // $('#otpForm :input').on('input', function() {
    //     console.log('OTP input changed'); // Add this line for debugging
    //     updateButtonState('otpForm', 'verifyOtp', 'otpFormError');
    // });
    // $('#otpInput').on('input', function() {
    //     updateButtonState('otpForm', 'verifyOtp', 'otpFormError');
    // });


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


function sendEmail() {
    const email = document.getElementById('drexelEmail').value;
    console.log('Sending email to user...', email);
    
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })  // Include the email in the request body
    })
    .then(response => response.json())
    .then(data => {
        console.log("response data: " + data); // Process your response data here
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

    document.getElementById('otpForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        console.log('Submitting OTP...');
        const otpInput = document.getElementById('otpInput');
        const otp = otpInput.value; // Get the value from the input field
    
        // AJAX request to your Flask route for OTP verification
        fetch('/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({otp: otp}) // Send the OTP in the request body
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // OTP verified successfully
                console.log('OTP verified in JS: Redirecting to /home...');
                createUser();
               
            } else {
                // OTP verification failed, handle the error
                console.error(data.message);
                $('#otpFormError').text('Invalid OTP');
                // Show an error message to the user
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });


function createUser() {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        username: document.getElementById('username').value,
        gender: document.getElementById('gender').value,
        drexelEmail: document.getElementById('drexelEmail').value,
        password1: document.getElementById('password1').value,
        password2: document.getElementById('password2').value
    };

    fetch('/submitAllDetails', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.status === 'success') {
    //         // window.location.href = '/home'; 
    //     } else {
    //         // Handle user creation error
    //     }
    // })
    .catch(error => {
        console.error('Error:', error);
    });
}

// function submitAllDetails() {
//     const formData = {
//         firstName: document.getElementById('firstName').value,
//         lastName: document.getElementById('lastName').value,
//         username: document.getElementById('username').value,
//         gender: document.getElementById('gender').value,
//         drexelEmail: document.getElementById('drexelEmail').value,
//         password1: document.getElementById('password1').value,
//         password2: document.getElementById('password2').value
//     };
//     console.log("FORM DATA: " + formData);

//     fetch('/submitAllDetails', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
      
//     })
//     // console.log(JSON.stringify(formData))
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         if (data.status === 'success') {
//             // Assuming the AJAX call to /submitAllDetails is successful, transition to the OTP form
//             $('#createUserForm2').fadeOut(animationSpeed, function() {
//                 $('#otpForm').fadeIn(animationSpeed);
//             });
//             setProgress(2); // Move the progress to the next step
//             window.location.href = '/home';  // Redirect to home only if user creation was successful
//         } else {
//             // Handle error, possibly by showing the error message from the response
//             console.error(data.message);
//             // You might want to display the error message on the form here
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }

// $('#verifyOtp').click(function() {
//     submitAllDetails(); 
// });