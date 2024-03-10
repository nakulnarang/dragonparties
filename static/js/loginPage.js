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

$(document).ready(function() {
    setProgress(0);
   
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
function submitAllDetails() {
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      
    })
    
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Assuming the AJAX call is successful, transition to the OTP form
        $('#createUserForm2').fadeOut(animationSpeed, function() {
            $('#otpForm').fadeIn(animationSpeed);
        });
        setProgress(2); // Move the progress to the next step
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

$('#getCode').click(function() {
    submitAllDetails(); // Call submitAllDetails when "Get Code" button is clicked
});

document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Get the values from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare the data to be sent in the POST request
    const loginData = {
        email: email,
        password: password
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Convert the JavaScript object to a JSON string
        body: JSON.stringify(loginData)
    }).then(response => {
        if (response.ok) {
            console.log(loginData);
            return response.text(); // or response.json() if your server sends JSON
        }
        throw new Error('Network response was not ok.');
    }).then(html => {
        // Process the response (e.g., redirect or update the page content)
        window.location.href = '/home'; // Redirect to /home on successful POST
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});





